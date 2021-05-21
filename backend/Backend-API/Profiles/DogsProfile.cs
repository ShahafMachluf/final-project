using Backend_API.Models.DbModels;
using Backend_API.Models.Dog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Backend_API.Models.User;

//used For Sending client Only part needed for him from contract , we dont want to expose him to data member Platform for exmaple.

namespace Backend_API.Profiles
{
    public class DogsProfile : Profile
    {
        public DogsProfile()
        {
            CreateMap<Dog, DogReadDto>(); //mapping from Dogs to ReadDto
            CreateMap<CreateDogReq, Dog>();
            CreateMap<Dog, CreateDogReqRes>();
            CreateMap<ApplicationUser, LoginReqRes>();
            CreateMap<ApplicationUser, RegisterReqRes>();
            CreateMap<Chat, UserChatModel>();
        }

    }
}
