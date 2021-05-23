using System;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;
using System.Net.WebSockets;

namespace Backend_API.Middleware
{
    public class WebSocketServerConnectionManager
    {
        private readonly ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

        public ConcurrentDictionary<string, WebSocket> GetAllSockets()
        {
            return _sockets;
        }

        public void AddSocket(WebSocket socket, string userId)
        {
            if(_sockets.ContainsKey(userId))
            {
                _sockets[userId] = socket;
                return;
            }

            _sockets.TryAdd(userId, socket);
        }

        public WebSocket GetById(string id)
        {
            return _sockets.FirstOrDefault(s => s.Key == id).Value;
        }

        public WebSocket RemoveSocket(string id)
        {
            _sockets.TryRemove(id, out WebSocket socket);
            return socket;
        }
    }
}
