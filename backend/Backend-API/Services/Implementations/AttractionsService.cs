using Backend_API.Data.Repository;
using Backend_API.Models.DbModels;
using Backend_API.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Services.Implementations
{
  public class AttractionsService : IAttractionsService
  {
    private readonly IRepo<Attraction> _repo;
    public AttractionsService(IRepo<Attraction> repo)
    {
      _repo = repo;
    }
    public async Task<IEnumerable<Attraction>> GetAllAttractionsAsync()
    {
      return await _repo.getAllAsync();
    }
  }
}
