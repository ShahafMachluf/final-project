using Backend_API.Data;
using Backend_API.Data.Repository;
using Backend_API.Models.DbModels;
using Backend_API.Models.Dog;
using Backend_API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
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
        private readonly IDogRepo _dogRepo;
        public DogService(AppDbContext appDbContext, IDogRepo dogRepo)
        {
            _appDbContext = appDbContext;
            _dogRepo = dogRepo;
        }

        public async Task<CreateDogReqRes> CreateDogAsync(CreateDogReq req)
        {
            Dog newDog = new Dog()
            {
                OwnerId = req.OwnerId,
                Name = req.Name,
                Age = req.Age,
                ImageURL = req.ImageURL,
                Race = req.Race,
                Color = req.Color,
                Size = req.Size,
                Gender = req.Gender,
                Information = req.Information,
                IsVaccinated = req.IsVaccinated,
                IsNeutered = req.IsNeutered,
            };

            await _dogRepo.CreateDogAsync(newDog);
            bool isCreated =  await _dogRepo.SaveChangesAsync();

            if (!isCreated)
            {
                throw new ApplicationException("Unable to create dog");
            }
            return new CreateDogReqRes()
            {
                Name = newDog.Name,
                Age = newDog.Age,
                ImageURL = newDog.ImageURL,
                Race = newDog.Race,
                Color = newDog.Color,
                Size = newDog.Size,
                Gender = newDog.Gender,
                Information = newDog.Information,
                IsVaccinated = newDog.IsVaccinated,
                IsNeutered = newDog.IsNeutered,
                Success = true,
            };
        }
    }
}
