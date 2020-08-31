using System;
using System.Collections.Generic;
using System.Text;

namespace UserService.Data.Models
{
    public class DoctorSearchModel
    {
        public int? AgeMin { get; set; }
        public int? AgeMax { get; set; }
        public string Nationality { get; set; }
        public string Language { get; set; }
        public string Speciality { get; set; }
    }
}
