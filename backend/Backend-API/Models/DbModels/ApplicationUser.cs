using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.DbModels
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName {get; set;}
        public string City { get; set; }
        public string ImageUrl { get; set; }
    }
}
