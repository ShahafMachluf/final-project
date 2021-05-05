using Backend_API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using Microsoft.AspNetCore.Http;
using Backend_API.Models.User;
using Backend_API.Services.Interfaces;
using Backend_API.Models.Dog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Backend_API.Models.DbModels;

namespace Backend_API.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/dog")]
    public class DogController : BaseController
    {
        private readonly IDogService _dogService;
        private readonly IUserService _userService;

        public DogController(
            IDogService dogService,
            IUserService userService) : base(userService)
        {
            _dogService = dogService;
            _userService = userService;
        }

        [HttpPost]
        [Route("createDog")]
        public async Task<IActionResult> createDog([FromBody] CreateDogReq request)
        {

            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new CreateDogReqRes()
                    {
                        Error = "Invalid parameters",
                        Success = false
                    });
                }

                CreateDogReqRes result = await _dogService.CreateDogAsync(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                if (ex is ArgumentException || ex is ApplicationException)
                {
                    return BadRequest(new CreateDogReqRes()
                    {
                        Success = false,
                        Error = ex.Message
                    });
                }

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> getAllDogs()
        {
            try
            {
                List<Dog> dogs = await _dogService.GetAllDogsAsync();

                return Ok(dogs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
