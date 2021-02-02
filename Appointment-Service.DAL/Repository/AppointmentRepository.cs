using Appointment_Service.DAL.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Appointment_Service.DAL.Repository
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private Context _context;
        public AppointmentRepository(Context context)
        {
            _context = context;
        }

        List<Appointment> IAppointmentRepository.GetAppointments(string doctorId)
        {
            return _context.Appointments.Where(a => a.DoctorId == doctorId).ToList();
        }

        void IAppointmentRepository.SaveAppointments(List<Appointment> appointments)
        {
            var patientId = appointments.First().PatientId;
            var doctorId = appointments.First().DoctorId;
            var currentAppointments = _context.Appointments.Where(a => a.PatientId == patientId && a.DoctorId == doctorId);
            _context.Appointments.RemoveRange(currentAppointments);
            _context.AddRange(appointments);
            _context.SaveChanges();
        }
    }
}
