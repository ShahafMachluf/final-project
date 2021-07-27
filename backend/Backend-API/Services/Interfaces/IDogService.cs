﻿using Backend_API.Models.DbModels;
using Backend_API.Models.Dog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Services.Interfaces
{
    public interface IDogService
    {
        Task<CreateDogReqRes> CreateDogAsync(CreateDogReq req);
        Task<IEnumerable<Dog>> GetAllDogsAsync();
        Task<Dog> GetDogByIdAsync(int id);
        Task ReactToDogAsync(ApplicationUser user, ReactToDogReq reaction);
        Task<IEnumerable<Dog>> GetLikedDogsAsync(ApplicationUser user);
        Task<IEnumerable<Dog>> GetAllDogsAsync(string City);
        Task<Dog> GetDogByIdAsync(int id);

    }
}
