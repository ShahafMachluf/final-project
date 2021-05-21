using Backend_API.Data.Repository;
using Backend_API.Models.Chat;
using Backend_API.Models.DbModels;
using Backend_API.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Backend_API.Services.Implementations
{
  public class ChatService : IChatService
  {
    private readonly IRepo<Chat> _repo;
    private readonly IMapper _mapper;

    public ChatService(
      IRepo<Chat> repo,
      IMapper mapper)
    {
      _repo = repo;
      _mapper = mapper;
    }

    public async Task<IEnumerable<ChatModel>> GetMyChatsAsync(ApplicationUser user)
    {
      var chats = await _repo.Get().Where(c => c.DogOwnerId == user.Id || c.AdopterId == user.Id).ToListAsync();

      return _mapper.Map<IEnumerable<ChatModel>>(chats);
    }

    public async Task CreateChatAsync(string adopterId, string ownerId, int likedDogId)
    {
      Chat chat = new Chat()
      {
        AdopterId = adopterId,
        DogOwnerId = ownerId,
        DogId = likedDogId
      };

      await _repo.CreateAsync(chat);
      await _repo.SaveChangesAsync();
    }
  }
}
