using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;

namespace Backend_API.Middleware
{
  public class WebSockerServerMiddleware
  {
    private readonly RequestDelegate _next;

    public WebSockerServerMiddleware(RequestDelegate next)
    {
      _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
      if (context.WebSockets.IsWebSocketRequest)
      {
        WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();

        await ReceiveMessage(webSocket, async (result, buffer) =>
        {
          if (result.MessageType == WebSocketMessageType.Text)
          {

          }
          else if (result.MessageType == WebSocketMessageType.Close)
          {

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
  }
}
