using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;

namespace TeleHealth.Appointment_Service
{
    public static class Helper
    {
        public static string GetUserIdFromToken(string token)
        {
            var accessToken = token.Replace("Bearer ", string.Empty);
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadJwtToken(accessToken);
            return decodedToken.Claims.First(f => f.Type == "UserId").Value;
        }
    }
}
