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
        public string Name { get; set; }
        public string Email { get; set; }
        public bool Success { get; set; }
        public string Error { get; set; }
    }
}
