using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace TeleHealth.Consultance_Service
{
    public class FileModel
    {
        public List<IFormFile> Files { get; set; }
    }
}
