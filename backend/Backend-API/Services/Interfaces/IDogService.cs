using Backend_API.Models.DbModels;
using Backend_API.Models.Dog;
using Backend_API.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Services.Interfaces
{
    public interface IDogService
    {
        Task<CreateDogReqRes> CreateDogAsync(CreateDogReq req);
        Task ReactToDogAsync(ApplicationUser user, ReactToDogReq reaction);
        Task<IEnumerable<Dog>> GetLikedDogsAsync(ApplicationUser user);
        Task<IEnumerable<Dog>> GetAllDogsAsync(ApplicationUser user);
        Task<IEnumerable<Dog>> GetAllDogsByAreaAsync(ApplicationUser user, Area area);
        Task<Dog> GetDogByIdAsync(int id);
        Task deleteDog(ApplicationUser user, Dog dog);
        Task updateDogInfo(PatchDogDto dogUpdated);
        public Task<IEnumerable<Dog>> getMyDogs(ApplicationUser currentUser);
        Task deleteReactionToDog(ApplicationUser currentUser, Dog dog);

        // Task deleteReaction(ApplicationUser currentUser, Reaction dog);
    }
}
