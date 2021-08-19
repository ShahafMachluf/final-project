using Backend_API.Data.Repository;
using Backend_API.Models.DbModels;
using Backend_API.Models.Enums;
using Backend_API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
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

        public async Task<IEnumerable<Attraction>> GetAllAttractionsAsync(ApplicationUser applicationUser)//get all attractions in your location
        {
            return await _repo.Get().Where(attraction => attraction.City == applicationUser.City).ToListAsync();
        }

        public async Task<IEnumerable<Attraction>> GetAttractionsByType(ApplicationUser currentUser, AttractionType i_Type)
        {
            return await _repo.Get().Where(attraction => attraction.City == currentUser.City && attraction.attractionType == i_Type).ToListAsync();
        }
    }
}
