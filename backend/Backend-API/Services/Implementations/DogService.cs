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
        private readonly IChatService _chatService;

        public DogService(
            IRepo<Dog> repo,
            IRepo<Reaction> reactionRepo,
            IMapper mapper,
            IFileService fileService,
            IChatService chatService)
        {
            _repo = repo;
            _mapper = mapper;
            _fileService = fileService;
            _reactionRepo = reactionRepo;
            _chatService = chatService;
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

        public async Task<IEnumerable<Dog>> GetAllDogsAsync(string City)
        {
            return await _repo.Get(dogs => dogs.Owner.City == City).ToListAsync();//Returns list of dogs living in current City
        }

        public async Task<Dog> GetDogByIdAsync(int id)// Need to see how you Will have the id of the dog on the front end - or doing it diffrently 
        {
            return await _repo.Get().Where(d => d.Id == id).FirstOrDefaultAsync();
        }

        public async Task ReactToDogAsync(ApplicationUser user, ReactToDogReq reaction)
        {
            Reaction newReaction = new Reaction()
            {
                DogId = reaction.DogId,
                ReactionToDog = reaction.Reaction,
                UserId = user.Id
            };

            await _reactionRepo.CreateAsync(newReaction);
            await _reactionRepo.SaveChangesAsync();

            if(reaction.Reaction == ReactionToDog.Like)
            {
                string dogOwnerId = (await GetDogByIdAsync(reaction.DogId)).Owner.Id;
                await _chatService.CreateChatAsync(user.Id, dogOwnerId, reaction.DogId);
            }      
        }

        public async Task<IEnumerable<Dog>> GetLikedDogsAsync(ApplicationUser user)
        {
            var likedDogs = await _reactionRepo.Get().Where(r => r.UserId == user.Id && r.ReactionToDog == ReactionToDog.Like)
                                               .Include(r => r.Dog)
                                               .Select(r => r.Dog)
                                               .ToListAsync();

            return likedDogs;
        }

        Task<Dog> IDogService.GetDogByIdAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
