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
using Microsoft.EntityFrameworkCore;
using AutoMapper;

namespace Backend_API.Services.Implementations
{
    public class DogService : IDogService
    {

        //mofa shel ha dog
        private readonly AppDbContext _appDbContext;
        private readonly IRepo<Dog> _repo;
        private readonly IMapper _mapper;

        public DogService(AppDbContext appDbContext, IRepo<Dog> repo, IMapper mapper)
        {
            _appDbContext = appDbContext;
            _repo = repo;
            _mapper = mapper;
        }

        public async Task<CreateDogReqRes> CreateDogAsync(CreateDogReq req)
        {
            Dog newDog = _mapper.Map<Dog>(req);

            await _repo.CreateAsync(newDog);
            bool isCreated =  await _repo.SaveChangesAsync();

            if (!isCreated)
            {
                throw new ApplicationException("Unable to create dog");
            }

            return _mapper.Map<CreateDogReqRes>(newDog);
            //return new CreateDogReqRes()
            //{
            //    Name = newDog.Name,
            //    Age = newDog.Age,
            //    ImageURL = newDog.ImageURL,
            //    Race = newDog.Race,
            //    Color = newDog.Color,
            //    Size = newDog.Size,
            //    Gender = newDog.Gender,
            //    Information = newDog.Information,
            //    IsVaccinated = newDog.IsVaccinated,
            //    IsNeutered = newDog.IsNeutered,
            //    Success = true,// For what?
            //};
        }

        public async Task<List<Dog>> GetAllDogsAsync()
        {
            return await _appDbContext.Dogs.ToListAsync();
        }

        public async Task<Dog> GetDogByIdAsync(int id)// Need to see how you Will have the id of the dog on the front end - or doing it diffrently 
        {
            return await _appDbContext.Dogs.FirstOrDefaultAsync(p => p.Id == id);//First object with id equal to paramter id )
        }
    }
}
