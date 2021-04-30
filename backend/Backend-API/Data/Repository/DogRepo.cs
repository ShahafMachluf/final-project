using Backend_API.Models.DbModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Data.Repository
{
    public class DogRepo: IDogRepo
    {
        private readonly AppDbContext _appDbContext;
        public DogRepo(AppDbContext appDbContext)
        {
            this._appDbContext = appDbContext;
        }

        public async Task CreateDogAsync(Dog dog)
        {
            if(dog == null)
            {
                throw new ArgumentException("null dog");
            }
            await _appDbContext.Dogs.AddAsync(dog);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() >= 0;
        }

    }
}
