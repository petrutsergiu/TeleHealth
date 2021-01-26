using ConsultanceService.DAL;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using TeleHealth.Consultance_Service.Models;

namespace TeleHealth.Consultance_Service
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

        public static List<PatientDocumentModel> ConvertTo(this List<PatientDocument> list)
        {
            List<PatientDocumentModel> result = new List<PatientDocumentModel>();
            list.ForEach(l =>
            {
                result.Add(new PatientDocumentModel()
                {
                    FileName = l.FileName,
                    FileLocation = l.FileLocation,
                    Description = l.Description,
                    StaticFilePath = l.StaticFilePath,
                    UploadDate = l.UploadDate.ToShortDateString()
                });
            });
            return result;
        }
    }
}
