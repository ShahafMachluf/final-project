using Backend_API.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Data.Repository
{
    public interface IDogRepo
    {
        Task CreateDogAsync(Dog dog);
        Task<bool> SaveChangesAsync();

    }
}
