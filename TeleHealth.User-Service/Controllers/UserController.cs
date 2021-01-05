using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TeleHealth.User_Service.Models;
using UserService.Data;
using UserService.Data.DAL;
using UserService.Data.Models;
using static TeleHealth.User_Service.Enums;

namespace user_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly ITokenHandler _tokenHandler;
        private readonly IUserDAL _user;


        public UserController(ILogger<UserController> logger, ITokenHandler tokenHandler, IUserDAL user)
        {
            _logger = logger;
            _tokenHandler = tokenHandler;
            _user = user;
        }
        [HttpGet("GetUserRoles")]
        public JsonResult GetUserRoles()
        {
            return new JsonResult(Roles.Admin.ToString());
        }


        [HttpPost("SignUpUser")]
        public JsonResult SignUpUser(User user)
        {
            ResponseModel response = new ResponseModel("User saved.", true); ;
            try
            {
                _user.CreateUser(user);
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }
        [HttpPost("LoginUser")]
        public JsonResult LoginUser(User user)
        {
            ResponseModel response = new ResponseModel("Login successfully.", true);
            try
            {
                User dbUser = _user.LoginUser(user.Username, user.Password);
                response.Token = _tokenHandler.GenerateToken(dbUser.Id, dbUser.Role);
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }
    }
}
