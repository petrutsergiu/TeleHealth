using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using TeleHealth.User_Service.Models;
using UserService.Data.DAL;
using UserService.Data.Models;

namespace TeleHealth.User_Service.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UserDetailsController : ControllerBase
    {
        private readonly IPatientsDAL _patients;
        private readonly IDoctorsDAL _doctors;

        public UserDetailsController(IPatientsDAL patients, IDoctorsDAL doctors)
        {
            _patients = patients;
            _doctors = doctors;
        }
        [HttpPost("SavePatientDetails")]
        public JsonResult SavePatientDetails(PatientDetails patient)
        {
            ResponseModel response = new ResponseModel("Patient details saved.", true);
            try
            {
                string userId = Helper.GetUserIdFromToken(Request.Headers[HeaderNames.Authorization].ToString());
                patient.CredentialsId = userId;
                _patients.SavePatientDetails(patient);
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }
        [HttpPost("UpdatePatientDetails")]
        public JsonResult UpdatePatientDetails(PatientDetails patient)
        {
            ResponseModel response = new ResponseModel("Patient details saved.", true);
            try
            {
                string userId = Helper.GetUserIdFromToken(Request.Headers[HeaderNames.Authorization].ToString());
                patient.CredentialsId = userId;
                _patients.UpdatePatientDetails(patient);
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }
        [HttpPost("SaveDoctorDetails")]
        public JsonResult SaveDoctorDetails(DoctorDetails doctor)
        {
            ResponseModel response = new ResponseModel("Doctor details saved.", true);
            try
            {
                string userId = Helper.GetUserIdFromToken(Request.Headers[HeaderNames.Authorization].ToString());
                doctor.CredentialsId = userId;
                _doctors.SaveDoctorDetails(doctor);
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }
        [HttpPost("UpdateDoctorDetails")]
        public JsonResult UpdateDoctorDetails(DoctorDetails doctor)
        {
            ResponseModel response = new ResponseModel("Doctor details saved.", true);
            try
            {
                string userId = Helper.GetUserIdFromToken(Request.Headers[HeaderNames.Authorization].ToString());
                doctor.CredentialsId = userId;
                _doctors.UpdateDoctorDetails(doctor);
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }
        [HttpPost("GetDoctorsByFilter")]
        public JsonResult GetDoctorsByFilter(DoctorSearchModel doctorSearchModel)
        {
            try
            {
                var response = new ResponseModel(_doctors.GetAllDoctorsByFilter(doctorSearchModel));
                return new JsonResult(response);
            }
            catch (Exception ex)
            {
                return new JsonResult(new ResponseModel(ex.Message, false));
            }
        }



    }
}
