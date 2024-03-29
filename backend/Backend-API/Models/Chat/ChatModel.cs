﻿using Backend_API.Models.Dog;
using Backend_API.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.Chat
{
    public class ChatModel
    {
        public int Id { get; set; }
        public UserChatModel DogOwner { get; set; }
        public UserChatModel Adopter { get; set; }
        public DogReadDto Dog { get; set; }
        public ICollection<ChatMessageModel> Messages { get; set; }
    }
}
