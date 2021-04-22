using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using static Backend_API.Models.Enums.Gender;
using static Backend_API.Models.Enums.Size;

namespace Backend_API.Models.DbModels
{
    public class Dog
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("Owner")]
        public string OwnerId { get; set; }
        public ApplicationUser Owner { get; set; }
        public double Age { get; set; }
        public string ImageURL { get; set; }
        [Required]
        public string Breed { get; set; }
        public string Color { get; set; }
        public eSize Size { get; set; }
        [Required]
        public eGender Gender { get; set; }
        public string Information { get; set; }
        public bool IsVaccinated { get; set; } //חיסון
        public bool IsNeutered { get; set; } //סירוס
    }
}
