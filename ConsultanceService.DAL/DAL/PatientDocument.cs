using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ConsultanceService.DAL
{
    public class PatientDocument
    {
        [Key]
        public int Id { get; set; }
        public string UserMongoId { get; set; }
        public string FileName { get; set; }
        public string FileLocation { get; set; }
        public string StaticFilePath { get; set; }
        public string Description { get; set; }
        public DateTime UploadDate { get; set; }

    }
}
