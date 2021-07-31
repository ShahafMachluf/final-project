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
using System.IdentityModel.Tokens.Jwt;

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

        public async Task InvokeAsync(HttpContext context, IChatService chatService, IUserService userService)
        {
            if (context.WebSockets.IsWebSocketRequest)
            {
                WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
                string userId = GetUserIdFromToken(context.WebSockets.WebSocketRequestedProtocols[1]);
                _manager.AddSocket(webSocket, userId);
                await ReceiveMessage(webSocket, async (result, buffer) =>
                {
                    if (result.MessageType == WebSocketMessageType.Text)
                    {
                        await RouteJsonMessageAsync(Encoding.UTF8.GetString(buffer, 0, result.Count), chatService, userService);

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

        private string GetUserIdFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodedToken =  handler.ReadJwtToken(token);
            var idClaim = decodedToken.Claims.Where(c => c.Type == "Id").FirstOrDefault();
            return idClaim.Value;
        }

        public async Task RouteJsonMessageAsync(string message, IChatService chatService, IUserService userService)
        {
            ChatMessageModel receivedMessage = JsonConvert.DeserializeObject<ChatMessageModel>(message);
            receivedMessage.Id = await chatService.SaveMessageAsync(receivedMessage);
            WebSocket socket = _manager.GetById(receivedMessage.ToUserId);
            if(socket != null && socket.State == WebSocketState.Open)
            {
                await socket.SendAsync(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(receivedMessage, Formatting.Indented)), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }
}
