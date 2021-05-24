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
        private readonly IRepo<Chat> _chatRepo;
        private readonly IRepo<ChatMessage> _chatMessageRepo;
        private readonly IMapper _mapper;

        public ChatService(
          IRepo<Chat> chatRepo,
          IRepo<ChatMessage> chatMessageRepo,
          IMapper mapper)
        {
            _chatRepo = chatRepo;
            _chatMessageRepo = chatMessageRepo;
            _mapper = mapper;
        }

        public async Task<IEnumerable<ChatModel>> GetMyChatsAsync(ApplicationUser user)
        {
            var chats = await _chatRepo.Get().Where(c => c.DogOwnerId == user.Id || c.AdopterId == user.Id)
                                         .Include(c => c.Adopter)
                                         .Include(c => c.DogOwner)
                                         .ToListAsync();

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

            await _chatRepo.CreateAsync(chat);
            await _chatRepo.SaveChangesAsync();
        }

        public async Task<int> SaveMessageAsync(ChatMessageModel message)
        {
            ChatMessage newMessage = _mapper.Map<ChatMessage>(message);
            await _chatMessageRepo.CreateAsync(newMessage);
            await _chatMessageRepo.SaveChangesAsync();

            int messageId = _chatMessageRepo.Get().Where(m => m.Time == newMessage.Time && m.FromUserId == newMessage.FromUserId && m.ToUserId == newMessage.ToUserId)
                                                  .Select(m => m.Id).FirstOrDefault();

            return messageId;
        }
    }
}
