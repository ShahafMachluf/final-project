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

namespace Backend_API.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(
            IUserService userService)
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
                        Erros = new List<string> { "Invalid payload" },
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
                        Erros = new List<string>() { ex.Message }
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
                        Erros = new List<string> { "Invalid payload" },
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
                        Erros = new List<string>() { ex.Message }
                    });
                }

                return new StatusCodeResult(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
