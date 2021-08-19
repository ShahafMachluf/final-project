using Backend_API.Authentication;
using Backend_API.Models.DbModels;
using Backend_API.Models.User;
using Backend_API.Services.Interfaces;
using Backend_API.Utilities;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Backend_API.Data.Repository;
using AutoMapper;
using System.Net;
using System.Net.Mail;


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

        public async Task<string> GetImageUrlAsync(string userId)
        {
            return await _repo.Get().Where(u => u.Id == userId).Select(u => u.ImageUrl).FirstOrDefaultAsync();
        }

        public async Task UpdatePushNotificationTokenAsync(ApplicationUser _currentUser, string token)
        {
            _currentUser.PushNotificationToken = token;

            await _repo.SaveChangesAsync();
        }

    public async Task ResetPasswordAsync(string email)
    {
      ApplicationUser user = await _userManager.FindByEmailAsync(email);
      if(user == null)
      {
        throw new ArgumentException("משתמש לא קיים");
      }

      string newPassword = GeneratePassword();
      string resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);
      var result = await _userManager.ResetPasswordAsync(user, resetToken, newPassword);
      if(result.Succeeded)
      {
        EmailNewPassword(user, newPassword);
      } 
      else
      {
        throw new ApplicationException(result.Errors.First().Description);
      }
    }

    private void EmailNewPassword(ApplicationUser user, string newPassword)
    {
      var fromAddress = new MailAddress(Consts.EmailAddress, Consts.FromEmailName);
      var toAddress = new MailAddress(user.Email, user.FullName);
      const string fromPassword = Consts.EmailPassword;
      const string subject = Consts.ResetPasswrodEmailSubject;
      string body = $@"
שלום {user.FullName}

סיסמתך החדשה הינה {newPassword}

בברכה
TinDog
";

      var smtp = new SmtpClient
      {
        Host = Consts.EmailHostAddress,
        Port = Consts.EmailHostPort,
        EnableSsl = true,
        DeliveryMethod = SmtpDeliveryMethod.Network,
        UseDefaultCredentials = false,
        Credentials = new NetworkCredential(fromAddress.Address, fromPassword)
      };

      var message = new MailMessage(fromAddress, toAddress)
      {
        Subject = subject,
        Body = body
      };
      smtp.Send(message);
      message.Dispose();
      smtp.Dispose();
    }

    private string GeneratePassword()
    {
      Random random = new Random();
      int newPassword = 0;
      for (int i = 0; i < 6; i++)
      {
        newPassword *= 10;
        newPassword += random.Next(1, 10);
      }

      return newPassword.ToString();
    }
  }
}
