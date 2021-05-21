using Backend_API.Models.Chat;
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
  [Route("api/chat")]
  public class ChatController : BaseController
  {
    private readonly IUserService _userService;
    private readonly IChatService _chatService;
    

    public ChatController(
      IUserService userService,
      IChatService chatService) : base(userService)
    {
      _userService = userService;
      _chatService = chatService;
    }

    [HttpGet]
    [Route("")]
    public async Task<IActionResult> GetChats()
    {
      try
      {
        IEnumerable<ChatModel> chats = await _chatService.GetMyChatsAsync(_currentUser);

        return Ok(chats);
      }
      catch (Exception ex)
      {
        return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
      }
    }
  }
}
