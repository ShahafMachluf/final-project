﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Models.User
{
    public class LoginReq
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
