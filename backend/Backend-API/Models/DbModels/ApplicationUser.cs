using Microsoft.AspNetCore.Identity;

namespace Backend_API.Models.DbModels
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName {get; set;}
        public string ImageUrl { get; set; }
        public string PushNotificationToken { get; set; }
    }
}
