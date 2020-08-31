using System;
using System.Collections.Generic;
using System.Text;

namespace UserService.Data
{
    public interface ITokenHandler
    {
       public string GenerateToken(string userId, string userRole);
    }
}
