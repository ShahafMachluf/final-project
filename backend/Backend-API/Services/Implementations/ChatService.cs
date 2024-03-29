﻿using Backend_API.Data.Repository;
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
            var chats = await _chatRepo.Get().Where(c => c.AdopterId == user.Id || (c.DogOwnerId == user.Id && c.Messages.Count > 0))
                                         .Include(c => c.Adopter)
                                         .Include(c => c.DogOwner)
                                         .Include(c => c.Dog)
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

        public async Task<ChatMessage> SaveMessageAsync(ChatMessageModel message)
        {
            ChatMessage newMessage = _mapper.Map<ChatMessage>(message);
            ChatMessage dbMessage  = await _chatMessageRepo.CreateAsync(newMessage);
            await _chatMessageRepo.SaveChangesAsync();

            dbMessage = await _chatMessageRepo.Get().Where(m => m.Id == dbMessage.Id)
                                                    .Include(cm => cm.ToUser)
                                                    .Include(cm => cm.FromUser)
                                                    .Include(cm => cm.Chat)
                                                    .FirstOrDefaultAsync();

            return dbMessage;
        }

        public async Task<List<ChatMessageModel>> GetChatMessages(int chatId)
        {
            List<ChatMessage> messages = await _chatMessageRepo.Get().Where(cm => cm.ChatId == chatId).OrderByDescending(cm => cm.Time).ToListAsync();

            return _mapper.Map<List<ChatMessageModel>>(messages);
        }
    }
}
