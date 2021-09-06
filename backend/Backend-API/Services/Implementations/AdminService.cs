using Backend_API.Data.Repository;
using Backend_API.Models.DbModels;
using Backend_API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Backend_API.Models.User;

namespace Backend_API.Services.Implementations
{
    public class AdminService : IAdminService
    {
        private readonly IRepo<Attraction> _repoAttractions;
        private readonly IRepo<ApplicationUser> _repoUsers;
        private readonly IRepo<Dog> _repoDogs;
        private readonly IDogService _dogService;

        public AdminService(IRepo<Attraction> repoAttraction, IRepo<ApplicationUser> repoUsers, IRepo<Dog> repoDogs, IDogService dogService)
        {
            _repoAttractions = repoAttraction;
            _repoUsers = repoUsers;
            _repoDogs = repoDogs;
            _dogService = dogService;
        }

        public async Task RemoveUserAsync(ApplicationUser user)
        {
            var userDogs = await _dogService.GetDogsByOwnerId(user.Id);
            await _repoDogs.DeleteAsync(userDogs);
            await _repoUsers.DeleteAsync(user);
        }

        public async Task<ApplicationUser> GetUserById(string id)
        {
            var applicationUser = await _repoUsers.Get().Where(u => u.Id == id).FirstOrDefaultAsync();

            return applicationUser;
        }

        public async Task RemoveAttraction(Attraction attraction)
        {
            await _repoAttractions.DeleteAsync(attraction);
            await _repoAttractions.SaveChangesAsync();
        }

        public async Task<Attraction> CreateAttraction(Attraction attraction)
        {
            await _repoAttractions.CreateAsync(attraction);
            bool isCreated = await _repoAttractions.SaveChangesAsync();

            if (isCreated != true)
            {
                throw new ApplicationException("Error occured while trying to create new attraction.");
            }

            return attraction;
        }

        public Task<Attraction> GetAttractionById(int id)
        {
            return _repoAttractions.Get().Where(Attraction => Attraction.Id == id).FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<ApplicationUser>> getAllUsers()
        {
            return (await _repoUsers.getAllAsync()).Where(u => u.Email != "tindogapp44@gmail.com");
        }

        public async Task<IEnumerable<Dog>> getAllDogs()
        {
            return await _repoDogs.getAllAsync();

        }

        public async Task<Dog> GetDogById(int id)
        {
            return await _repoDogs.Get().Where(dog => dog.Id == id).FirstOrDefaultAsync();
        }

        public async Task RemoveDog(Dog dog)
        {
            await _repoDogs.DeleteAsync(dog);
            await _repoDogs.SaveChangesAsync();
        }
    }
}
