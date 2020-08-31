using System;
using System.Collections.Generic;
using System.Text;

namespace UserService.Data.Models
{
    public class UsersDBSettings : IUsersDBSettings
    {
        public string PatientsCollectionName { get; set; }
        public string DoctorsCollectionName { get; set; }
        public string UsersCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
