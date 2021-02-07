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
        public JsonResult GetAppointments(Appointment appointment)
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
                    From = a.From,
                    Title = a.Title,
                    To = a.To
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
                foreach(AppointmentModel ap in appointments)
                {
                    result.Add(new Appointment()
                    {
                        AllDay = ap.AllDay,
                        AppointmentId = ap.AppointmentId,
                        DoctorId = ap.DoctorId,
                        From = ap.From,
                        PatientId = userId,
                        Title = ap.Title,
                        To = ap.To
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
    }
}
