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
using Backend_API.Models.Enums;

namespace Backend_API.Services.Implementations
{
    public class DogService : IDogService
    {
        private readonly IRepo<Dog> _repo;
        private readonly IRepo<Reaction> _reactionRepo;
        private readonly IMapper _mapper;
        private readonly IFileService _fileService;

        public DogService(
            IRepo<Dog> repo,
            IRepo<Reaction> reactionRepo,
            IMapper mapper,
            IFileService fileService)
        {
            _repo = repo;
            _mapper = mapper;
            _fileService = fileService;
            _reactionRepo = reactionRepo;
        }

        public async Task<CreateDogReqRes> CreateDogAsync(CreateDogReq req)
        {
            string imageUrl = await _fileService.UploadImageFromBase64Async(req.ImageBase64);
            Dog newDog = _mapper.Map<Dog>(req);
            newDog.ImageURL = imageUrl;

            await _repo.CreateAsync(newDog);
            bool isCreated =  await _repo.SaveChangesAsync();

            if (!isCreated)
            {
                throw new ApplicationException("התרחשה תקלה, נסה שוב מאוחר יותר");
            }

            return _mapper.Map<CreateDogReqRes>(newDog);
        }

        public async Task<IEnumerable<Dog>> GetAllDogsAsync()
        {
            return await _repo.getAllAsync();
        }

        public Dog GetDogByIdAsync(int id)// Need to see how you Will have the id of the dog on the front end - or doing it diffrently 
        {
            return _repo.Get(d => d.Id == id).FirstOrDefault();
        }

        public async Task ReactToDogAsync(ApplicationUser user, ReactToDogReq reaction)
        {
            Dog likedDog = GetDogByIdAsync(reaction.DogId);
            Reaction newReaction = new Reaction()
            {
                Dog = likedDog,
                ReactionToDog = reaction.Reaction,
                User = user
            };

            await _reactionRepo.CreateAsync(newReaction);
            await _reactionRepo.SaveChangesAsync();
        }

        public IEnumerable<Dog> GetLikedDogsAsync(ApplicationUser user)
        {
            var likedDogs =  _reactionRepo.Get(r => r.UserId == user.Id && r.ReactionToDog == ReactionToDog.Like)
                                                     .Include(r => r.Dog)
                                                     //.Select(r => r.Dog)
                                                     .ToList();

            return null;
        }
    }
}
