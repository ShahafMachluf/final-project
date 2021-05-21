using Backend_API.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.Chat
{
  public class ChatMessageModel
  {
    public UserChatModel FromUser { get; set; }
    public UserChatModel ToUser { get; set; }
    public DateTime Time { get; set; }
    public string Message { get; set; }
  }
}
