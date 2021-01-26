using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using UserService.Data.Models;

namespace UserService.Data.DAL
{
    public class UserDAL : IUserDAL
    {
        private readonly IMongoCollection<User> _users;
        private readonly IMongoCollection<PatientDetails> _patients;
        private readonly IMongoCollection<DoctorDetails> _doctors;

        public UserDAL(IUsersDBSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<User>(settings.UsersCollectionName);
            _patients = database.GetCollection<PatientDetails>(settings.PatientsCollectionName);
            _doctors = database.GetCollection<DoctorDetails>(settings.DoctorsCollectionName);

        }
        public List<User> GetAll()
        {
            return _users.Find(s => true).ToList();
        }
        public User GetById(string id)
        {
            return _users.Find<User>(s => s.Id == id).FirstOrDefault();
        }
        public void Update(string id, User user)
        {
            _users.ReplaceOne(s => s.Id == id, user);
        }
        public void Delete(string id)
        {
            _users.DeleteOne(s => s.Id == id);
        }

        void IUserDAL.CreateUser(User user)
        {
            if (_users.Find<User>(s => s.Username == user.Username).FirstOrDefault() != null)
                throw new Exception("Username already exists");
            _users.InsertOne(user);
        }

        User IUserDAL.LoginUser(User user)
        {
            User dbUser = _users.Find<User>(s => s.Username == user.Username && s.Password == user.Password).FirstOrDefault();
            if (dbUser == null)
                throw new Exception("Invalid username or password");
            if (dbUser.Role == Enums.Roles.Doctor.ToString())
                dbUser.CompletedAccount = _doctors.Find(d => d.CredentialsId == dbUser.Id).Any();
            else if (dbUser.Role == Enums.Roles.Patient.ToString())
                dbUser.CompletedAccount = _patients.Find(d => d.CredentialsId == dbUser.Id).Any();
            return dbUser;
        }
    }
}
