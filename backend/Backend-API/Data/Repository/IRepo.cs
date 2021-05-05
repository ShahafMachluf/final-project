using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Data.Repository
{
    public interface IRepo<TEntity> 
    {
        Task CreateAsync(TEntity newObject);
        Task<bool> SaveChangesAsync();
    }
}
