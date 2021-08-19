using Backend_API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Backend_API.Models.User;
using Backend_API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Backend_API.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController 
    {
        private readonly IAdminService _adminService;
        private readonly IMapper _mapper;

        public AdminController(IAdminService adminService)
        { 
            _adminService = adminService;
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> deleteUser(string id)
        {
            try
            {
                var user =  _adminService.GetById(id);
                if (user == null)
                {
                    return NotFound();
                }
                else
                {
                    await _adminService.RemoveUser(user);
                    return Ok(user);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status203NonAuthoritative, ex.Message);
            }
        }
    }
}
