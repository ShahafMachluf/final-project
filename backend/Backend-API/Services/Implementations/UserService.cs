using Backend_API.Authentication;
using Backend_API.Data;
using Backend_API.Models;
using Backend_API.Models.DbModels;
using Backend_API.Models.User;
using Backend_API.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Backend_API.Data.Repository;
using AutoMapper;

namespace Backend_API.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IRepo<ApplicationUser> _repo;
        private readonly IFileService _fileService;
        private readonly JwtConfig _jwtConfig;
        private readonly IMapper _mapper;

        public UserService(
            UserManager<ApplicationUser> userManager,
            IOptionsMonitor<JwtConfig> optionsMonitor,
            IRepo<ApplicationUser> repo,
            IFileService fileService,
            IMapper mapper)
        {
            _userManager = userManager;
            _jwtConfig = optionsMonitor.CurrentValue;
            _repo = repo;
            _fileService = fileService;
            _mapper = mapper;
        }

        public async Task<RegisterReqRes> RegisterAsync(RegisterReq req)
        {
            ApplicationUser existingUser = await _userManager.FindByEmailAsync(req.Email);
            if(existingUser != null)
            {
                throw new ArgumentException("דוא\"ל נמצא בשימוש");
            }

            ApplicationUser newUser = new ApplicationUser()
            {
                Email = req.Email,
                UserName = req.Email,
                FullName = req.FullName,
                MaxDistance = 50
            };

            IdentityResult isCreated = await _userManager.CreateAsync(newUser, req.Password);
            if(!isCreated.Succeeded)
            {
                throw new ApplicationException(isCreated.Errors.First().Description);
            }


            RegisterReqRes result = _mapper.Map<RegisterReqRes>(newUser);
            result.Token = GenerateJwtToken(newUser);

            return result;
        }

        public async Task<LoginReqRes> LoginAsync(LoginReq req)
        {
            ApplicationUser existingUser = await _userManager.FindByEmailAsync(req.Email);
            if(existingUser == null)
            {
                throw new ArgumentException("דוא\"ל או הסיסמא אינם נכונים");
            }

            bool isCorrectPassword = await _userManager.CheckPasswordAsync(existingUser, req.Password);
            if(!isCorrectPassword)
            {
                throw new ArgumentException("דוא\"ל או הסיסמא אינם נכונים");
            }

            LoginReqRes result = _mapper.Map<LoginReqRes>(existingUser);
            result.Token = GenerateJwtToken(existingUser);

            return result;
        }

        public async Task<string> UpdateProfilePictureUrlAsync(string base64Image, ApplicationUser user)
        {
            if(user.ImageUrl != null)
            {
                await _fileService.DeleteImage(user.ImageUrl);
            }

            string pictureUrl = await _fileService.UploadImageFromBase64Async(base64Image);
            if(pictureUrl == string.Empty || pictureUrl == null)
            {
                throw new Exception("התרחשה תקלה, נסה שוב מאוחר יותר");
            }

            user.ImageUrl = pictureUrl;
            bool isSaved = await _repo.SaveChangesAsync();
            if(!isSaved)
            {
                throw new Exception("התרחשה תקלה, נסה שוב מאוחר יותר");
            }

            return pictureUrl;
        }

        public ApplicationUser GetById(string id)
        {
            return _repo.Get().Where(u => u.Id == id).FirstOrDefault();
        }

        public async Task UpdateMaxDistanceAsync(ApplicationUser user, int maxDistnace)
        {
            user.MaxDistance = maxDistnace;
            await _repo.SaveChangesAsync();
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            JwtSecurityTokenHandler jwtToketHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                }),
                Expires = DateTime.Now.AddYears(500),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtToketHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtToketHandler.WriteToken(token);

            return jwtToken;
        }
    }
}
