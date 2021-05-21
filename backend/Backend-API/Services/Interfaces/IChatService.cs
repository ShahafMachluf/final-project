using Backend_API.Models.Chat;
using Backend_API.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Services.Interfaces
{
  public interface IChatService
  {
    Task<IEnumerable<ChatModel>> GetMyChatsAsync(ApplicationUser user);
    Task CreateChatAsync(string adopterId, string ownerId, int likedDogId);
  }
}
