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
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

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
                throw new ApplicationException("התרחשה תקלה בעת יצירת הכלב, נסה שוב מאוחר יותר");
            }

            return _mapper.Map<CreateDogReqRes>(newDog);
        }

        //Show only UnReacted dogs which are in your chosen city( ofcourse not your own dogs)
        public async Task<IEnumerable<Dog>> GetAllDogsAsync(ApplicationUser applicationUser, Area area )
        {
            List<Dog> cityDogList =  await _repo.Get().Where(dog => dog.Area == area && dog.Owner.Id != applicationUser.Id).ToListAsync();//Returns list of dogs living in 
            List<Dog> didReactionDogList  = await _reactionRepo.Get().Where(reaction => reaction.UserId == applicationUser.Id ).Include(reaction => reaction.Dog).Select(reaction => reaction.Dog).ToListAsync();
            cityDogList.RemoveAll(dog => didReactionDogList.Contains(dog)); // remove Reacted dogs from search of dogs in chosen city.
            return cityDogList;
        }

        public async Task<Dog> GetDogByIdAsync(int id)
        {
            return await _repo.Get().Where(d => d.Id == id).Include(d => d.Owner).FirstOrDefaultAsync();
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

        public async Task deleteDog(ApplicationUser user, Dog dog)
        {
            if (dog.OwnerId == user.Id)
            {
                await _repo.Delete(dog);
                await _repo.SaveChangesAsync();
            }
            else
            {
                throw new ApplicationException("לא ניתן למחוק את הכלב");
            }
        }

        //public async Task deleteReaction(ApplicationUser currentUser, Reaction dog)
        //{
        //    await _reactionRepo.Delete(dog);
        //}
        public async Task updateDogInfo(PatchDogDto dogUpdated)
        {
            Dog dogFromRepository = _repo.Get().Where(d => d.Id == dogUpdated.Id).FirstOrDefault();
            if(dogFromRepository == null)
            {
                throw new ApplicationException("כלב זה לא קיים במאגר");
            }

            _mapper.Map(dogUpdated, dogFromRepository);//For it to Work. need to make sure the frontend sends 
            //All missing parts complete from the old dog info
            await _repo.SaveChangesAsync();
          //  return StatusCodes.Status204NoContent; //updated Dog.
        }

        public async Task<IEnumerable<Dog>> getMyDogs(ApplicationUser currentUser)
        {
            List<Dog> myDogsList = await _repo.Get().Where(d => d.OwnerId == currentUser.Id).ToListAsync();

            return myDogsList;
        }

        public async Task deleteReactionToDog(ApplicationUser currentUser, Dog dog)
        {
           Reaction reactionToDelete =  await _reactionRepo.Get().Where(reaction => reaction.DogId == dog.Id && reaction.UserId == currentUser.Id).FirstOrDefaultAsync();
           await _reactionRepo.Delete(reactionToDelete);
        }
    }
}
