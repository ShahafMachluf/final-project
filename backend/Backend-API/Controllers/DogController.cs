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
using Backend_API.Data.Repository;
using AutoMapper;

namespace Backend_API.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    [Route("api/dog")]
    public class DogController : BaseController
    {
        private readonly IDogService _dogService;
        private readonly IMapper _mapper;

        public DogController(
            IDogService dogService,
            IUserService userService, 
            IMapper mapper) : base(userService)
        {
            _dogService = dogService;
            _mapper = mapper;
            
        }

        [HttpGet]
        [Route("{City}")]
        public async Task<IActionResult> getAllDogs(string City)//in the Location wanted
        {
            try
            {
                var dogsItems = await _dogService.GetAllDogsAsync(City);
                return Ok(_mapper.Map<IEnumerable<DogReadDto>>(dogsItems)); // Will recive Dogs from function getAllDogs, and using the mapper to convert them to readDogDto and 
            }
            catch(Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
                
            }
        }

        [HttpGet]// /api/dog/id 
        [Route("{id}")]
        public async Task<IActionResult> GetDogById(int id)//id is from {id}
        {
            try
            {
                var dogItem = await _dogService.GetDogByIdAsync(id);
                if (dogItem != null)
                {
                    return Ok(_mapper.Map<DogReadDto>(dogItem));
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("createDog")]
        public async Task<IActionResult> createDog([FromBody] CreateDogReq request)
        {
            try
            {
                CreateDogReqRes result = await _dogService.CreateDogAsync(request);

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

    [HttpPost]
    [Route("react")]
    public async Task<IActionResult> ReactToDog([FromBody] ReactToDogReq reaction)
    {
      try
      {
        await _dogService.ReactToDogAsync(_currentUser, reaction);

        return Ok(true);
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
     }

    [HttpGet]
    [Route("liked")]
    public async Task<IActionResult> GetLikedDogs()
    {
      try
      {
        var dogs = await _dogService.GetLikedDogsAsync(_currentUser);

        return Ok(dogs);
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
    }
    }
}
