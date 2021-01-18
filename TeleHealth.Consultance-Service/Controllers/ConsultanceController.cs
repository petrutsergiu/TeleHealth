using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace TeleHealth.Consultance_Service.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ConsultanceController : ControllerBase
    {
        public ConsultanceController()
        {

        }

        [HttpPost("UploadFiles")]
        public JsonResult UploadFiles([FromForm] FileModel data)
        {
            ResponseModel response = new ResponseModel("Patient details saved.", true);
            try
            {
                string userId = Helper.GetUserIdFromToken(Request.Headers[HeaderNames.Authorization].ToString());
                string directory = Path.Combine(Directory.GetCurrentDirectory(),"UserDocuments",userId);
                if (!Directory.Exists(directory))
                {
                    Directory.CreateDirectory(directory);
                }
                foreach (IFormFile file in data.Files)
                {
                    string filePath = Path.Combine(directory, file.FileName);
                    
                    using (Stream s = new FileStream(filePath, FileMode.Create))
                    {
                        file.CopyTo(s);
                    }
                }
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }
    }
}
