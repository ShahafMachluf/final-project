using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Backend_API.Models.Chat;
using Backend_API.Services.Interfaces;
using System.Text;

namespace Backend_API.Middleware
{
    public class WebSocketServerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly WebSocketServerConnectionManager _manager;

        public WebSocketServerMiddleware(
            RequestDelegate next, 
            WebSocketServerConnectionManager manager)
        {
            _next = next;
            _manager = manager;
        }

        public async Task InvokeAsync(HttpContext context, IChatService chatService)
        {
            if (context.WebSockets.IsWebSocketRequest)
            {
                WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();

                string userId = context.User.FindFirst("id").Value;
                _manager.AddSocket(webSocket, userId);
                await ReceiveMessage(webSocket, async (result, buffer) =>
                {
                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        await RouteJsonMessageAsync(Encoding.UTF8.GetString(buffer, 0, result.Count), chatService);

                        return;
                    }
                    else if (result.MessageType == WebSocketMessageType.Close)
                    {
                        WebSocket removedSocket = _manager.RemoveSocket(userId);
                        await removedSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);

                        return;
                    }
                });
            }
            else
            {
                await _next(context);
            }
        }

        private async Task ReceiveMessage(WebSocket socket, Action<WebSocketReceiveResult, byte[]> handleMessage)
        {
            var buffer = new byte[1024 * 4];

            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
                handleMessage(result, buffer);
            }
        }

        public async Task RouteJsonMessageAsync(string message, IChatService chatService)
        {
            ChatMessageModel receivedMessage = JsonConvert.DeserializeObject<ChatMessageModel>(message);
            chatService.SaveMessageAsync(receivedMessage);
            WebSocket socket = _manager.GetById(receivedMessage.ToUserId);
            if(socket != null && socket.State == WebSocketState.Open)
            {
                await socket.SendAsync(Encoding.UTF8.GetBytes(receivedMessage.Message), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }
}
