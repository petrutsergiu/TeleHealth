using ConsultanceService.DAL;
using ConsultanceService.DAL.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TeleHealth.Consultance_Service.Models;

namespace TeleHealth.Consultance_Service.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class ConsultanceController : ControllerBase
    {
        private IPatientRepository _patientRepo;
        public ConsultanceController(IPatientRepository patientRepository)
        {
            _patientRepo = patientRepository;
        }

        [HttpPost("UploadFiles")]
        public JsonResult UploadFiles([FromForm] FileModel data)
        {
            ResponseModel response = new ResponseModel("Patient details saved.", true);
            try
            {
                string userId = Helper.GetUserIdFromToken(Request.Headers[HeaderNames.Authorization].ToString());
                string directory = Path.Combine(Directory.GetCurrentDirectory(), "UserDocuments", userId);
                if (!Directory.Exists(directory))
                    Directory.CreateDirectory(directory);
                string filePath = Path.Combine(directory, data.File.FileName);
                _patientRepo.AddDocument(new PatientDocument()
                {
                    FileLocation = filePath,
                    FileName = data.File.FileName,
                    UserMongoId = userId,
                    StaticFilePath = Path.Combine("UserDocuments", userId, data.File.FileName),
                    UploadDate = DateTime.Now,
                    Description = data.Description
                });

                using (Stream s = new FileStream(filePath, FileMode.Create))
                {
                    data.File.CopyTo(s);
                }
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }
        [HttpGet("GetUserDocuments")]
        public JsonResult GetUserDocuments()
        {
            ResponseModel response = new ResponseModel();
            try
            {
                string userId = Helper.GetUserIdFromToken(Request.Headers[HeaderNames.Authorization].ToString());
                response.Content = _patientRepo.GetUserDocuments(userId).ConvertTo();
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }
    }
}
