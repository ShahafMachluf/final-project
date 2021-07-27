using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.DbModels
{
  public class Chat
  {
    [Key]
    public int Id { get; set; }
    public ApplicationUser DogOwner { get; set; }
    public ApplicationUser Adopter { get; set; }
    [ForeignKey("DogOwner")]
    public string DogOwnerId { get; set; }
    [ForeignKey("Adopter")]
    public string AdopterId { get; set; }
    public Dog Dog { get; set; }
    [ForeignKey("Dog")]
    public int DogId { get; set; }
    public virtual ICollection<ChatMessage> Messages { get; set; }
  }
}
