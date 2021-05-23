using Backend_API.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.Chat
{
    public class ChatMessageModel
    {
        public string FromUserId { get; set; }
        public string ToUserId { get; set; }
        public int ChatId { get; set; }
        public DateTime Time { get; set; }
        public string Message { get; set; }
    }
}
