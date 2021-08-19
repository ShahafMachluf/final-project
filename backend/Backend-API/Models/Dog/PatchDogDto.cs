using Backend_API.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.Dog
{
    public class PatchDogDto
    {

        public int Id { get; set; }
        public string Name { get; set; }
       // [Required]
       // [StringLength()]
        public double Age { get; set; }
        public string ImageBase64 { get; set; }
        public string Race { get; set; }
        public string Color { get; set; }
        public eSize Size { get; set; }
        public string Information { get; set; }
        public bool IsVaccinated { get; set; } //חיסון
        public bool IsNeutered { get; set; } //סירוס
        public string City { get; set; }//עיר מגוריו של הכלב והבעלים
        public Area Area { get; set; }

    }
}
