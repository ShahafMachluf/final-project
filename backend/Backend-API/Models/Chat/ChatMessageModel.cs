using Newtonsoft.Json;
using System;

namespace Backend_API.Models.Chat
{
    public class ChatMessageModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("fromUserId")]
        public string FromUserId { get; set; }
        [JsonProperty("toUserId")]
        public string ToUserId { get; set; }
        [JsonProperty("chatId")]
        public int ChatId { get; set; }
        [JsonProperty("time")]
        public DateTime Time { get; set; }
        [JsonProperty("message")]
        public string Message { get; set; }
    }
}
