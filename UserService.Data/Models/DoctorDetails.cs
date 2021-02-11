using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace UserService.Data.Models
{
    public class DoctorDetails
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string CredentialsId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int Age { get; set; }
        public char Gender { get; set; }
        public string Language { get; set; }
        public string Location { get; set; }
        public float YearsExperience { get; set; }
        public string Degree { get; set; }
        public string Certificates { get; set; }
        public string Speciality { get; set; }
        public double Rating { get; set; }
        public int NumberOfRatings { get; set; }
        public string Tariffs { get; set; }
        public string Nationality { get; set; }


    }
}
