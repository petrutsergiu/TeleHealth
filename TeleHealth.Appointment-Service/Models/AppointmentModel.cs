using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeleHealth.Appointment_Service.Models
{
    public class AppointmentModel
    {
        public int AppointmentId { get; set; }
        public double From { get; set; }
        public double To { get; set; }
        public string Title { get; set; }
        public bool AllDay { get; set; }
        public string DoctorId {get;set;}
        public string PatientId { get; set; }
        public string Status { get; set; }
    }
}
