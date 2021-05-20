using Backend_API.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.Dog
{
  public class ReactToDogReq
  {
    public int DogId { get; set; }
    public ReactionToDog Reaction { get; set; }
  }
}
