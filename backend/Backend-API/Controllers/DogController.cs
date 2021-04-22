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

namespace Backend_API.Controllers
{
    [ApiController]
    [Route("api/dog")]
    public class DogController : ControllerBase
    {
        private readonly IDogService _dogService;

        public DogController(
            IDogService dogService)
        {
            _dogService = dogService;
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

                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
