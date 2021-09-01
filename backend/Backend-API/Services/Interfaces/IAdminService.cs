using Backend_API.Models.DbModels;
using Backend_API.Models.User;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Services.Interfaces
{
    public interface IAdminService
    {
        Task RemoveUser(ApplicationUser user);
        Task RemoveAttraction(Attraction attraction);
        Task<Attraction> CreateAttraction(Attraction attraction);
        Task<ApplicationUser> GetUserById(string id);
        Task<Attraction> GetAttractionById(int id);
        Task<IEnumerable<ApplicationUser>> getAllUsers();
        Task<IEnumerable<Dog>> getAllDogs();
        Task<Dog> GetDogById(int id);
        Task RemoveDog(Dog dog);
    }
}
