using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.DbModels
{
    public class Dog
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [Required]
        public double Age { get; set; }
        [Required]
        public string Race { get; set; }
        public eSize Size { get; set; }
        [Required]
        public eGender Gender { get; set; }
        public string Information { get; set; }
        public bool IsVaccinated { get; set; } //חיסון
        public bool IsNeutered { get; set; } //סירוס
        public enum eSize
        {
            Small,
            Medium,
            Large
        }

        public enum eGender
        {
            Male,
            Female
        }
    }
}
