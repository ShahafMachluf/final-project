using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Backend_API.Models.Enums;

namespace Backend_API.Models.Dog
{//Will hold only data members that we wwould like to send back to the frontend about the current dog ( for exampe, without the owner information which is ireleavent)
    public class DogReadDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double? Age { get; set; }
        public string ImageURL { get; set; }
        public string Race { get; set; }
        public string Color { get; set; }
        public eSize? Size { get; set; }
        public eGender? Gender { get; set; }
        public string Information { get; set; }
        public bool? IsVaccinated { get; set; } //חיסון
        public bool? IsNeutered { get; set; } //סירוס
        public Area Area { get; set; }

    }
}

