using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UserService.Data.Models;

namespace UserService.Data.DAL
{
    public class PatientsDAL:IPatientsDAL
    {
        private readonly IMongoCollection<PatientDetails> _patients;
        public PatientsDAL(IUsersDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _patients = database.GetCollection<PatientDetails>(settings.PatientsCollectionName);
        }
        public List<PatientDetails> GetAll()
        {
            return _patients.Find(s => true).ToList();
        }
        public PatientDetails GetById(string id)
        {
            return _patients.Find<PatientDetails>(s => s.Id == id).FirstOrDefault();
        }
        public PatientDetails Create(PatientDetails patient)
        {
            _patients.InsertOne(patient);
            return patient;
        }
        public void Delete(string id)
        {
            _patients.DeleteOne(s => s.Id == id);
        }

        void IPatientsDAL.SavePatientDetails(PatientDetails patient)
        {
            _patients.InsertOne(patient);
        }

        void IPatientsDAL.UpdatePatientDetails(PatientDetails patient)
        {
            _patients.ReplaceOne(s => s.CredentialsId == patient.CredentialsId, patient);
        }
    }
}
