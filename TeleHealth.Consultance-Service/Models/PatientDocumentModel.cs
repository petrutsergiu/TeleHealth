using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeleHealth.Consultance_Service.Models
{
    public class PatientDocumentModel
    {
        public string FileName { get; set; }
        public string FileLocation { get; set; }
        public string StaticFilePath { get; set; }
        public string Description { get; set; }
        public string UploadDate { get; set; }
        public string MongoUserId { get; set; }
    }
}
