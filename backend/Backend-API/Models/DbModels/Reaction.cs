using Backend_API.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.DbModels
{
    public class Reaction
    {
        [Key]
        public int Id { get; set; }
        public ApplicationUser User{ get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual Dog Dog { get; set; }
        [ForeignKey("Dog")]
        public int DogId { get; set; }
        public ReactionToDog ReactionToDog { get; set; }
    }
}
