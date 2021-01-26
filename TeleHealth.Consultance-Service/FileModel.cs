using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace TeleHealth.Consultance_Service
{
    public class FileModel
    {
        public IFormFile File { get; set; }
        public string Description { get; set; }
    }
}
