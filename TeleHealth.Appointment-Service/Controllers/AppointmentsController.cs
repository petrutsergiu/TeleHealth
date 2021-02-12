using Appointment_Service.DAL.DAL;
using Appointment_Service.DAL.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TeleHealth.Appointment_Service.Models;

namespace TeleHealth.Appointment_Service.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class AppointmentsController : ControllerBase
    {

        private IAppointmentRepository _appRepo;
        public AppointmentsController(IAppointmentRepository appRepo)
        {
            _appRepo = appRepo;
        }

        [HttpPost("GetAppointments")]
        public JsonResult GetAppointments(AppointmentModel appointment)
        {
            ResponseModel response = new ResponseModel();
            try
            {
                var appointments = _appRepo.GetAppointments(appointment.DoctorId);
                response.Content = ConvertToModel(appointments);
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }

        [HttpGet("GetAllDoctorAppointments")]
        public JsonResult GetAllDoctorAppointments()
        {
            ResponseModel response = new ResponseModel();
            try
            {
                string userId = Helper.GetUserIdFromToken(Request.Headers[HeaderNames.Authorization].ToString());
                var appointments = _appRepo.GetAppointments(userId);
                response.Content = ConvertToModel(appointments);
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }

        private List<AppointmentModel> ConvertToModel(List<Appointment> appointments)
        {
            List<AppointmentModel> result = new List<AppointmentModel>();
            appointments.ForEach(a =>
            {
                result.Add(new AppointmentModel()
                {
                    AllDay = a.AllDay,
                    AppointmentId = a.AppointmentId,
                    DoctorId = a.DoctorId,
                    From = new DateTimeOffset(a.From).ToUnixTimeMilliseconds(),
                    Title = a.Title,
                    To = new DateTimeOffset(a.To).ToUnixTimeMilliseconds(),
                    Status = a.Status,
                    PatientId=a.PatientId
                });
            });
            return result;
        }

        [HttpPost("SaveAppointments")]
        public JsonResult SaveAppointments(List<AppointmentModel> appointments)
        {
            ResponseModel response = new ResponseModel("Appointments saved.", true);
            try
            {
                string userId = Helper.GetUserIdFromToken(Request.Headers[HeaderNames.Authorization].ToString());
                    List<Appointment> result = new List<Appointment>();
                    foreach (AppointmentModel ap in appointments)
                    {
                        result.Add(new Appointment()
                        {
                            AllDay = ap.AllDay,
                            AppointmentId = ap.AppointmentId,
                            DoctorId = ap.DoctorId,
                            From = ConvertToDate(ap.From),
                            PatientId = userId,
                            Title = ap.Title,
                            To = ConvertToDate(ap.To),
                            Status=ap.Status
                        });
                    }
                    _appRepo.SaveAppointments(result);
            }
            catch (Exception ex)
            {
                response = new ResponseModel(ex.Message, false);
            }
            return new JsonResult(response);
        }

        private DateTime ConvertToDate(double timestamp)
        {
            System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
            dtDateTime = dtDateTime.AddMilliseconds(timestamp).ToLocalTime();
            return dtDateTime;
        }
    }
}
