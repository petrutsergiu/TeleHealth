using System;
using System.Collections.Generic;
using System.Text;
using UserService.Data.Models;

namespace UserService.Data.DAL
{
    public interface IDoctorsDAL
    {
        void SaveDoctorDetails(DoctorDetails doctor);
        void UpdateDoctorDetails(DoctorDetails doctor);
        List<DoctorDetails> GetAllDoctorsByFilter(DoctorSearchModel doctorSearchModel);
        List<DoctorDetails> GetAll();
    }
}
