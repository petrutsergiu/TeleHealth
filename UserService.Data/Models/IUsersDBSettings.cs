using System;
using System.Collections.Generic;
using System.Text;

namespace UserService.Data.Models
{
    public interface IUsersDBSettings
    {
        public string PatientsCollectionName { get; set; }
        public string DoctorsCollectionName { get; set; }
        public string UsersCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
