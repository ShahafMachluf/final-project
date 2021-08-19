using Backend_API.Data.Repository;
using Backend_API.Models.DbModels;
using Backend_API.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend_API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.Http;
using Backend_API.Models.User;
using Backend_API.Services.Interfaces;
using Backend_API.Models.Dog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Backend_API.Models.DbModels;
using Backend_API.Data.Repository;
using AutoMapper;

namespace Backend_API.Services.Implementations
{
    public class AdminService : IAdminService
    {
        private readonly IRepo<Attraction> _repoAttractions;
        private readonly IRepo<ApplicationUser> _repoUsers;

        public async Task AddAttraction(Attraction attraction)
        {
            await _repoAttractions.CreateAsync(attraction);
            bool isCreated = await _repoAttractions.SaveChangesAsync();

            if (isCreated != true)
            {
                throw new ApplicationException("התרחשה תקלה בעת הוספת האטרקציה, נסה שוב מאוחר יותר");

            }
        }

        public async Task RemoveUser(ApplicationUser  user)
        {
            var applicationUser = _repoUsers.Get().Where(User => User.Id == user.Id).FirstOrDefault();

            if (applicationUser != null)
            {
                await _repoUsers.Delete(applicationUser);
            }
        }


        public ApplicationUser GetById(string id)
        {
            return _repoUsers.Get().Where(u => u.Id == id).FirstOrDefault();
        }

    }
}
