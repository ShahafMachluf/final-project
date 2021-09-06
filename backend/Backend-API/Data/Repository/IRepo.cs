using Backend_API.Models.DbModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Data.Repository
{
    public interface IRepo<TEntity> 
    {
        Task<TEntity> CreateAsync(TEntity newObject);
        Task<bool> SaveChangesAsync();
        Task<IEnumerable<TEntity>> getAllAsync();
        IQueryable<TEntity> Get();
        Task DeleteAsync(TEntity objectToRemove);
        Task DeleteAsync(IEnumerable<TEntity> objectsToRemove);
    }
}
