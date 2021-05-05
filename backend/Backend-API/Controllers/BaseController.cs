using Backend_API.Models.DbModels;
using Backend_API.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Controllers
{
    public class BaseController : ControllerBase
    {
        private readonly IUserService _userService;

        public ApplicationUser _currentUser 
        { 
            get
            {
                return _userService.GetById(HttpContext.User.FindFirst("id").Value);
            }
        }

        public BaseController(IUserService userService)
        {
            _userService = userService;
        }
    }
}
