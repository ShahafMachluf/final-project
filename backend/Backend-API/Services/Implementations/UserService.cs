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
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Backend_API.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtConfig _jwtConfig;

        public UserService(
            UserManager<ApplicationUser> userManager,
            IOptionsMonitor<JwtConfig> optionsMonitor)
        {
            _userManager = userManager;
            _jwtConfig = optionsMonitor.CurrentValue;
            
        }

        public async Task<RegisterReqRes> RegisterAsync(RegisterReq req)
        {
            ApplicationUser existingUser = await _userManager.FindByEmailAsync(req.Email);
            if(existingUser != null)
            {
                throw new ArgumentException("Email already in use");
            }

            ApplicationUser newUser = new ApplicationUser()
            {
                Email = req.Email,
                UserName = req.Email,
                FullName = req.FullName,
            };

            IdentityResult isCreated = await _userManager.CreateAsync(newUser, req.Password);
            if(!isCreated.Succeeded)
            {
                throw new ApplicationException("Unable to create user");
            }

            return new RegisterReqRes()
            {
                Id = newUser.Id,
                Name = newUser.FullName,
                Email = newUser.Email,
                Success = true,
                Token = GenerateJwtToken(newUser)
            };
        }

        public async Task<LoginReqRes> LoginAsync(LoginReq req)
        {
            ApplicationUser existingUser = await _userManager.FindByEmailAsync(req.Email);
            if(existingUser == null)
            {
                throw new ArgumentException("Incorrect email or password");
            }

            bool isCorrectPassword = await _userManager.CheckPasswordAsync(existingUser, req.Password);
            if(!isCorrectPassword)
            {
                throw new ArgumentException("Incorrect email or password");
            }

            return new LoginReqRes()
            {
                Id = existingUser.Id,
                Name = existingUser.FullName,
                Email = existingUser.Email,
                Success = true,
                Token = GenerateJwtToken(existingUser)
            };
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
                Expires = DateTime.Now.AddHours(6),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = jwtToketHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtToketHandler.WriteToken(token);

            return jwtToken;
        }
    }
}
