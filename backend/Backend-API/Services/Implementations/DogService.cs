﻿using Backend_API.Data;
using Backend_API.Models.DbModels;
using Backend_API.Models.Dog;
using Backend_API.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Services.Implementations
{
    public class DogService : IDogService
    {

        //mofa shel ha dog
        private readonly AppDbContext _appDbContext;
        public DogService(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
            // or new
        }

        public async Task<CreateDogReqRes> CreateDogAsync(CreateDogReq req)
        {
            Dog newDog = new Dog()
            {
                Name = req.Name,
                Age = req.Age,
                ImageURL = req.ImageURL,
                Breed = req.Breed,
                Color = req.Color,
                Size = req.Size,
                Gender = req.Gender,
                Information = req.Information,
                IsVaccinated = req.IsVaccinated,
                IsNeutered = req.IsNeutered,
            };
            _appDbContext.SaveChanges();//move to new function
        }
    }
}
