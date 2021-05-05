using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using  Backend_API.Models.DbModels;
using  Backend_API.Models.Enums;
using  Backend_API.Models.Enums;

namespace Backend_API.Models.Dog
{
    public class CreateDogReq
    {
        public string OwnerId { get; set; }
        public string Name { get; set; }
        public double? Age { get; set; }
        public string ImageURL { get; set; }
        //[Required]
        public string Race { get; set; }
        public string Color { get; set; }
        public eSize? Size { get; set; }
        //[Required]
        public eGender? Gender { get; set; }
        public string Information { get; set; }
        public bool? IsVaccinated { get; set; } //חיסון
        public bool? IsNeutered { get; set; } //סירוס

    }


}
