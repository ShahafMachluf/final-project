using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Backend_API.Models.User;
using Backend_API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace Backend_API.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService): base(userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] RegisterReq request)
        {
            try
            {
                RegisterReqRes result = await _userService.RegisterAsync(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                if(ex is ArgumentException || ex is ApplicationException)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
                }

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginReq request)
        {
            try
            {
                LoginReqRes result = await _userService.LoginAsync(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                if(ex is ArgumentException)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
                }

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("profilePicture")]
        public async Task<IActionResult> UploadProfilePicture([FromBody] UploadImageReq request)
        {
            try
            {
                string imageUrl = await _userService.UpdateProfilePictureUrlAsync(request.ImageBase64, _currentUser);

                return Ok(imageUrl);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("maxDistance")]
        public async Task<IActionResult> UpdateMaxDistance([FromBody] int maxDistance)
        {
            try
            {
                await _userService.UpdateMaxDistanceAsync(_currentUser, maxDistance);

                return Ok(true);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("notificationToken")]
        public async Task<IActionResult> UpdatePushNotificationToken([FromBody] string token)
        {
            try
            {
                if (_currentUser.PushNotificationToken != token)
                {
                    await _userService.UpdatePushNotificationTokenAsync(_currentUser, token);
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

    [HttpPost]
    [Route("resetPassword")]
    public async Task<IActionResult> ResetPassword([FromBody] string email)
    {
      try
      {
        await _userService.ResetPasswordAsync(email);

        return Ok(true);
      }
      catch (Exception ex)
      {
        if(ex is ApplicationException || ex is ArgumentException)
        {
          return StatusCode(StatusCodes.Status400BadRequest, ex.Message);
        }

        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
    }
    }
}
