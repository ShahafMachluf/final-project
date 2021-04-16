using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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
    public int Age { get; set; }
    public string ImageURL { get; set; }
    public string Size { get; set; }
    public string Breed { get; set; }
    public string Color { get; set; }
    [Required]
    public bool IsFromAssociation { get; set; }
    public string LinkFromAssociation { get; set; }
  }
}
