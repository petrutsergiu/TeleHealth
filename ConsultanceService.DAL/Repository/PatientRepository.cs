using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ConsultanceService.DAL.Repository
{
    public class PatientRepository:IPatientRepository
    {
        private TeleHealthContext _context;
        public PatientRepository(TeleHealthContext context)
        {
            _context = context;
        }

        void IPatientRepository.AddDocument(PatientDocument patientDocument)
        {
            _context.Add(patientDocument);
            _context.SaveChanges();
        }

        List<string> IPatientRepository.GetFilePaths(string userId)
        {
            return _context.PatientDocuments.Where(p => p.UserMongoId == userId).Select(p => p.StaticFilePath).ToList();
        }

        List<PatientDocument> IPatientRepository.GetUserDocuments(string userId)
        {
            return _context.PatientDocuments.Where(p => p.UserMongoId == userId).ToList();
        }
    }
}
