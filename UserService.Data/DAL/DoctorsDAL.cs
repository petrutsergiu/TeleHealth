using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UserService.Data.Models;

namespace UserService.Data.DAL
{
    public class DoctorsDAL : IDoctorsDAL
    {
        private readonly IMongoCollection<DoctorDetails> _doctors;
        public DoctorsDAL(IUsersDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _doctors = database.GetCollection<DoctorDetails>(settings.DoctorsCollectionName);
        }
        List<DoctorDetails> IDoctorsDAL.GetAll()
        {
            return _doctors.Find(s => true).ToList();
        }
        public DoctorDetails GetById(string id)
        {
            return _doctors.Find<DoctorDetails>(s => s.Id == id).FirstOrDefault();
        }
        public DoctorDetails Create(DoctorDetails doctor)
        {
            _doctors.InsertOne(doctor);
            return doctor;
        }
        public void Delete(string id)
        {
            _doctors.DeleteOne(s => s.Id == id);
        }

        void IDoctorsDAL.SaveDoctorDetails(DoctorDetails doctor)
        {
            _doctors.InsertOne(doctor);
        }

        void IDoctorsDAL.UpdateDoctorDetails(DoctorDetails doctor)
        {
            _doctors.ReplaceOne(s => s.Id == doctor.Id, doctor);
        }

        List<DoctorDetails> IDoctorsDAL.GetAllDoctorsByFilter(DoctorSearchModel doctorSearchModel)
        {
            var filterBuilder = Builders<DoctorDetails>.Filter;
            FilterDefinition<DoctorDetails> filter = filterBuilder.Empty;
            if (doctorSearchModel.AgeMin != null)
                filter &= filterBuilder.Gte(f => f.Age, doctorSearchModel.AgeMin.Value);
            if (doctorSearchModel.AgeMax != null)
                filter &= filterBuilder.Lte(f => f.Age, doctorSearchModel.AgeMax.Value);
            if (!string.IsNullOrEmpty(doctorSearchModel.Language))
                filter &= filterBuilder.Eq(f => f.Language, doctorSearchModel.Language);
            if (!string.IsNullOrEmpty(doctorSearchModel.Nationality))
                filter &= filterBuilder.Eq(f => f.Nationality, doctorSearchModel.Nationality);
            if (!string.IsNullOrEmpty(doctorSearchModel.Speciality))
                filter &= filterBuilder.Eq(f => f.Speciality, doctorSearchModel.Speciality);

            return _doctors.Find<DoctorDetails>(filter).ToList();
        }

        DoctorDetails IDoctorsDAL.GetDoctorByCredentialId(string userId)
        {
            return _doctors.Find<DoctorDetails>(s => s.CredentialsId == userId).FirstOrDefault();
        }
    }
}
