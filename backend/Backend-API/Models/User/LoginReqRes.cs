using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.User
{
    public class LoginReqRes
    {
        public string Id { get; set; }
        public string Token { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string ImageUrl { get; set; }
        public int MaxDistance { get; set; }
        public string PushNotificationToken { get; set; }
    }
}
