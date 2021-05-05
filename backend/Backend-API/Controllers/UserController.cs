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
                if(!ModelState.IsValid)
                {
                    return BadRequest(new RegisterReqRes()
                    {
                        Error = "Invalid email, password or name",
                        Success = false
                    });
                }

                RegisterReqRes result = await _userService.RegisterAsync(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                if(ex is ArgumentException || ex is ApplicationException)
                {
                    return BadRequest(new RegisterReqRes()
                    {
                        Success = false,
                        Error = ex.Message
                    });
                }

                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginReq request)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new RegisterReqRes()
                    {
                        Error = "Invalid email or password",
                        Success = false
                    });
                }

                LoginReqRes result = await _userService.LoginAsync(request);

                return Ok(result);
            }
            catch (Exception ex)
            {
                if(ex is ArgumentException)
                {
                    return BadRequest(new LoginReqRes()
                    {
                        Success= false,
                        Error =  ex.Message
                    });
                }

                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("profilePicture")]
        public async Task<IActionResult> UploadProfilePicture([FromBody] UploadImageReq request)
        {
            try
            {
                string imageUrl = await _userService.UpdateProfilePictureUrl(request.ImageBase64, _currentUser);

                return Ok(imageUrl);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
