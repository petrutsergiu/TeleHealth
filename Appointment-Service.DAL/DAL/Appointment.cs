using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Appointment_Service.DAL.DAL
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; }
        public int AppointmentId { get; set; }
        public DateTime From { get; set; }
        public DateTime To { get; set; }
        public string Title { get; set; }
        public bool AllDay { get; set; }
        public string PatientId { get; set; }
        public string DoctorId { get; set; }

    }
}
