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
using Backend_API.Data.Repository;
using AutoMapper;

namespace Backend_API.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/dog")]
    public class DogController : ControllerBase
    {
        private readonly IDogService _dogService;
        private readonly IDogRepo _dogRepository;
        private readonly IMapper _mapper;

        public DogController(
            IDogService dogService, IDogRepo dogRepo, IMapper mapper)
        {
            _dogService = dogService;
            _dogRepository = dogRepo;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("{id}")]
        public ActionResult<IEnumerable<DogReadDto>> getAllDogs(int id)//id of client
        {
            //return all dogs of client with that id 
            var dogsItems = _dogRepository.getAllDogs(id);

            return Ok(_mapper.Map<IEnumerable<DogReadDto>>(dogsItems)); // Will recive Dogs from function getAllDogs, and using the mapper to convert them to readDogDto and 
            //Returning to the client.
        }

        [HttpGet("{id}", Name = "GetCommandByDog")]// /api/commands/ id ----Forgot what name is for :(
        public ActionResult<DogReadDto> GetCommandByDog(int id)//id is from {id}
        {
            var dogItem = _dogRepository.GetDogById(id);
            if (dogItem != null)
            {
                return Ok(_mapper.Map<DogReadDto>(dogItem));
            }
            else
            {
                return NotFound();
            }
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
