using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using user_service.Models;
using UserService.Data;

namespace user_service.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        public UserController(ILogger<UserController> logger)
        {
            _logger = logger;
        }

        [HttpGet("Testie")]
        public User GetTestie()
        {
            MongoDAL mongo = new MongoDAL();
            mongo.GetMongo();
            return new User() { FirstName = "User-Sergiu", LastName = "Pete", Age = 30 };
        }
    }
}
