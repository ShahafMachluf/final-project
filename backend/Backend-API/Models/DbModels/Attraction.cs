using Backend_API.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.DbModels
{
    public class Attraction
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }//Required
        public string Address { get; set; }//Required
        public string City { get; set; }//Required
        public string ImageURL { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public AttractionType attractionType {get; set;}
    }
}
