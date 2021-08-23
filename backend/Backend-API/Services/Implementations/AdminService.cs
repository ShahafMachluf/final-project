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

namespace Backend_API.Services.Implementations
{
    public class AdminService : IAdminService
    {
        private readonly IRepo<Attraction> _repoAttractions;
        private readonly IRepo<ApplicationUser> _repoUsers;

        public async Task RemoveUser(ApplicationUser user)
        {
            await _repoUsers.Delete(user);
            bool isDeleted = await _repoUsers.SaveChangesAsync();
            if(isDeleted != true)
            {
                throw new ApplicationException("Cannot delete user.");
            }
        }

        public async Task<ApplicationUser> GetUserById(string id)
        {
            var applicationUser = await _repoUsers.Get().Where(u => u.Id == id).FirstOrDefaultAsync();

            return applicationUser;
        }

        public async Task RemoveAttraction(Attraction attraction)
        {
            await _repoAttractions.Delete(attraction);
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
    }
}
