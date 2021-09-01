using Backend_API.Models.Enums;
using Backend_API.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/attraction")]
    public class AttractionsController : BaseController
    {
        private readonly IAttractionsService _attractionService;

        public AttractionsController(
          IUserService userService,
          IAttractionsService attractionService) : base(userService)
        {
            _attractionService = attractionService;
        }

        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetAllAttractions()
        {
            try
            {
                var attractions = await _attractionService.GetAllAttractionsAsync(_currentUser);

                return Ok(attractions);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }


        [HttpGet]
        [Route("type/{i_Type}")]
        public async Task<IActionResult> GetAttractionsByType(AttractionType i_Type)
        {
            try
            {
                var attractions = await _attractionService.GetAttractionsByType(_currentUser, i_Type);

                return Ok(attractions);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }

        }
    }
}
