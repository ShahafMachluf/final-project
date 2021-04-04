using Backend_API.Models;
using Backend_API.Models.User;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Services.Interfaces
{
    public interface IUserService
    {
        Task<RegisterReqRes> RegisterAsync(RegisterReq req);
        Task<LoginReqRes> LoginAsync(LoginReq req);
    }
}
