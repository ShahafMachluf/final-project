using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Backend_API.Services.Interfaces;
using AutoMapper;
using Backend_API.Models.DbModels;
using Backend_API.Models.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Backend_API.Controllers
{
    [ApiController]
    [Authorize(Roles = "Admin", AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;
        private readonly IUserService _userService;
    private readonly IAttractionsService _attractionsService;
        private readonly IMapper _mapper;

        public AdminController(IAdminService adminService, IUserService userService, IAttractionsService attractionsService)
        { 
            _adminService = adminService;
            _userService = userService;
      _attractionsService = attractionsService;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginReq request)
        {
            try
            {
                LoginReqRes result = await _userService.LoginAsync(request);
                string role = await _userService.GetUserRoleAsync(result.Email);
                if(role != "Admin")
                {
                  throw new ArgumentException("דוא\"ל או הסיסמא אינם נכונים");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                if (ex is ArgumentException)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
                }

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("users")]
        public async Task<IActionResult> getAllUsers()
        {
            try
            {
                var users = await _adminService.getAllUsers();
                return Ok(users);
            }
            catch(Exception ex)
            {
                if (ex is ArgumentException || ex is ApplicationException)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
                }

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("dogs")]
        public async Task<IActionResult> getAllDogs()
        {
            try
            {
                var users = await _adminService.getAllDogs();
                return Ok(users);
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

        [HttpPost]
         [Route("attraction")]
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
        [Route("user/{id}")]
        public async Task<IActionResult> deleteUser(string id)//and his dogs..
        {
            try
            {
                var user = await _adminService.GetUserById(id);
                if (user == null)
                {
                    return NotFound();
                }
                await _adminService.RemoveUserAsync(user);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status203NonAuthoritative, ex.Message);
            }
        }

        [HttpDelete]
        [Route("dog/{id}")]
        public async Task<IActionResult> deleteDog(int id)
        {
            try
            {
                var dog = await _adminService.GetDogById(id);
                if (dog == null)
                {
                    return NotFound();
                }

                await _adminService.RemoveDog(dog);
                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status203NonAuthoritative, ex.Message);
            }
        }

    [HttpGet]
    [Route("attractions")]
    public async Task<IActionResult> GetAllAttractions()
    {
      try
      {
        var attractions = await _attractionsService.GetAllAttractionsAsync();

        return Ok(attractions);
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status203NonAuthoritative, ex.Message);
      }
    }
    }
}
