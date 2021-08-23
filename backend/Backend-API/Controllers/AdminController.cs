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
using AutoMapper;
using Backend_API.Models.DbModels;

namespace Backend_API.Controllers
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IMapper _mapper;

        public AdminController(IAdminService adminService)
        { 
            _adminService = adminService;
        }

         [HttpPost]
         [Route("addAttraction")]
         public async Task<IActionResult> addAttraction([FromBody] Attraction attraction )
        {
            try
            {
                Attraction result = await _adminService.CreateAttraction(attraction);

                return Ok(result);
            }
            catch (Exception ex)
            {
                if (ex is ArgumentException || ex is ApplicationException)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
                }

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete]
        [Route("attraction/{id}")]
        public async Task<IActionResult> deleteAttraction(int id)
        {
            try
            {
                var attraction = await _adminService.GetAttractionById(id);
                if (attraction == null)
                {
                    return NotFound();
                }
                else
                {
                    await _adminService.RemoveAttraction(attraction);
                    return Ok(attraction);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status203NonAuthoritative, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> deleteUser(string id)//and his dogs..
        {
            try
            {
                var user = await _adminService.GetUserById(id);
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
