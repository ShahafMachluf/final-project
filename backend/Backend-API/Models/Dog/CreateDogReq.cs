using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.Dog
{
    public class CreateDogReq
    {
        public int id { get; set; }
        [Required]
        public string name { get; set; }
        [Required]
        public double age { get; set; }
        public string race { get; set; }
        public Size size { get; set; }
        [Required]
        public Gender gender { get; set; }
        public string information { get; set; }
        public bool isVaccinated { get; set; } //חיסון
        public bool isNeutered { get; set; } //סירוס

        public enum Size
        {
            Small,
            Medium,
            Large
        }

        public enum Gender
        {
            Male,
            Female
        }
}


}
