using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Backend_API.Services.Interfaces;
using Backend_API.Models.Dog;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AutoMapper;
using Backend_API.Models.Enums;

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
        [Route("{area}")]
        public async Task<IActionResult> getAllDogs(Area area)//in the Location wanted
        {
            try
            {
                var dogsItems = await _dogService.GetAllDogsAsync(_currentUser, area);//user who sent the request.
                return Ok(_mapper.Map<IEnumerable<DogReadDto>>(dogsItems)); // Will recive Dogs from function getAllDogs, and using the mapper to convert them to readDogDto and 
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);

            }
        }

        [HttpPatch]
        [Route("id")]
        public async Task<IActionResult> updateExistingDog([FromBody] PatchDogDto dogUpdated)
        {
            try
            {

                await _dogService.updateDogInfo(dogUpdated);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> deleteDog(int id)
        {
            try
            {
                var dog = await _dogService.GetDogByIdAsync(id);
                if (dog == null)
                {
                    return NotFound();
                }
                else
                {
                    await _dogService.deleteDog(_currentUser, dog);
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status203NonAuthoritative, ex.Message);
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

        [HttpDelete]
        [Route("/delete/likedDog/{id}")]// delete/likedDog/id
        public async Task<IActionResult> deleteLikedDogFromList(int idOfDog)
        {
            try
            {
                var dog = await _dogService.GetDogByIdAsync(idOfDog);
                if (dog == null)
                {
                    return NotFound();
                }
                else
                {
                    //await _dogService.deleteDog(_currentUser, dog);;
                    await _dogService.deleteReactionToDog(_currentUser, dog);
                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
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

        [HttpGet]
        [Route("myDogs")]
        public async Task<IActionResult> getMyDogs()
        {
            try
            {
                var dogs = await _dogService.getMyDogs(_currentUser);

                return Ok(dogs);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
    }
    }
}
