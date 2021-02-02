using Appointment_Service.DAL.DAL;
using System;
using System.Collections.Generic;
using System.Text;

namespace Appointment_Service.DAL.Repository
{
    public interface IAppointmentRepository
    {
        void SaveAppointments(List<Appointment> appointments);
        List<Appointment> GetAppointments(string doctorId);
    }
}
