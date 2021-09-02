using Backend_API.Models;
using Backend_API.Models.DbModels;
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
        ApplicationUser GetById(string id);
        Task<string> UpdateProfilePictureUrlAsync(string base64Image, ApplicationUser user);
        Task UpdateMaxDistanceAsync(ApplicationUser user, int maxDistnace);
        Task<string> GetImageUrlAsync(string userId);
        Task UpdatePushNotificationTokenAsync(ApplicationUser _currentUser, string token);
        Task ResetPasswordAsync(string email);
        Task<string> GetUserRoleAsync(string userEmail);
  }
}
