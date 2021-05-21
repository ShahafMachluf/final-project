using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.DbModels
{
  public class ChatMessage
  {
    [Key]
    public int Id { get; set; }
    public ApplicationUser FromUser { get; set; }
    public ApplicationUser ToUser { get; set; }
    [ForeignKey("FromUser")]
    public string FromUsedId { get; set; }
    [ForeignKey("ToUser")]
    public string ToUsedId { get; set; }
    public Chat Chat { get; set; }
    [ForeignKey("Chat")]
    public int ChatId { get; set; }
    public DateTime Time { get; set; }
    public string Message { get; set; }
  }
}
