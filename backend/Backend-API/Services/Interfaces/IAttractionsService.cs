using Backend_API.Models.DbModels;
using Backend_API.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Services.Interfaces
{
  public interface IAttractionsService
  {
    Task<IEnumerable<Attraction>> GetAllAttractionsAsync();
    public Task<IEnumerable<Attraction>> GetAttractionsByType(ApplicationUser currentUser, AttractionType type);

    }
}
