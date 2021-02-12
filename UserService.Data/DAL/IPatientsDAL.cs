using System;
using System.Collections.Generic;
using System.Text;
using UserService.Data.Models;

namespace UserService.Data.DAL
{
    public interface IPatientsDAL
    {
        void SavePatientDetails(PatientDetails patient);
        void UpdatePatientDetails(PatientDetails patient);
        PatientDetails GetPatientByCredentialId(string userId);
        List<PatientDetails> GetPatients();
    }
}
