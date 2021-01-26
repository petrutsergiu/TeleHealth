using System;
using System.Collections.Generic;
using System.Text;

namespace ConsultanceService.DAL.Repository
{
    public interface IPatientRepository
    {
        void AddDocument(PatientDocument patientDocument);
        List<string> GetFilePaths(string userId);
        List<PatientDocument> GetUserDocuments(string userId);
    }
}
