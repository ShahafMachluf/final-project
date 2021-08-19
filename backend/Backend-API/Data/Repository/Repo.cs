using Backend_API.Models.DbModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Data.Repository
{
    public class Repo<TEntity> : IRepo<TEntity> where TEntity : class
    {
        private readonly AppDbContext _appDbContext;
        private readonly DbSet<TEntity> _dbSet;
        public Repo(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
            _dbSet = appDbContext.Set<TEntity>();
        }

        public async Task CreateAsync(TEntity newObject)
        {
            await _dbSet.AddAsync(newObject);
        }

        public async Task<IEnumerable<TEntity>> getAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() >= 0;
        }

        public IQueryable<TEntity> Get()
        {
            return _dbSet.AsQueryable();
        }

        public async Task Delete(TEntity objectToRemove)
        {//if its to delete dog you will also need to delete all his reactions and what so ever... messy
            //_dbSet.Remove(objectToRemove);
            _appDbContext.Remove(objectToRemove); //only removes dogs from dog database.
            await SaveChangesAsync();
        }
    }
}
