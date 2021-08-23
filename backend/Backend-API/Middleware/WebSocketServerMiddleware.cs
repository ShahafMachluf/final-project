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
using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using Backend_API.Models.DbModels;

namespace Backend_API.Middleware
{
    public class WebSocketServerMiddleware
    {
        private static readonly HttpClient _client = new HttpClient();

        private readonly RequestDelegate _next;
        private readonly WebSocketServerConnectionManager _manager;

        public WebSocketServerMiddleware(
            RequestDelegate next, 
            WebSocketServerConnectionManager manager)
        {
            _next = next;
            _manager = manager;
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            _client.DefaultRequestHeaders.AcceptEncoding.Add(new StringWithQualityHeaderValue("gzip"));
            _client.DefaultRequestHeaders.AcceptEncoding.Add(new StringWithQualityHeaderValue("deflate"));
        }

        public async Task InvokeAsync(HttpContext context, IChatService chatService, IUserService userService)
        {
            try
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
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
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
            ChatMessage dbMessage = await chatService.SaveMessageAsync(receivedMessage);
            receivedMessage.Id = dbMessage.Id;
            WebSocket socket = _manager.GetById(dbMessage.ToUserId);
            await SendPushNotification(dbMessage);
            if (socket != null && socket.State == WebSocketState.Open)
            {
                await socket.SendAsync(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(receivedMessage, Formatting.Indented)), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }

        public async Task SendPushNotification(ChatMessage receivedMessage)
        {
            if(!string.IsNullOrEmpty(receivedMessage.ToUser.PushNotificationToken))
            {
                var pushMessage = new
                {
                    to = receivedMessage.ToUser.PushNotificationToken,
                    title = $"הודה חדשה מ - {receivedMessage.FromUser.FullName}",
                    body = receivedMessage.Message.Substring(0, 20 > receivedMessage.Message.Length ? receivedMessage.Message.Length : 20),
                    data = new
                    {
                        chatDetails = new 
                        {
                          id = receivedMessage.Chat.Id,
                          adopter = receivedMessage.Chat.Adopter,
                          dogOwner = receivedMessage.Chat.DogOwner,
                        }
                    },
                };

                HttpContent content = JsonContent.Create(pushMessage);
                var response = await _client.PostAsync("https://exp.host/--/api/v2/push/send", content, CancellationToken.None);
            }
        }
    }
}
