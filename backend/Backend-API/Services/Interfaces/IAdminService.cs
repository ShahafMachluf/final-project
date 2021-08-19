using Backend_API.Models.DbModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Services.Interfaces
{
    public interface IAdminService
    {
        public Task RemoveUser(ApplicationUser user);
        public Task AddAttraction(Attraction attraction);
        public ApplicationUser GetById(string id);
    }
}
