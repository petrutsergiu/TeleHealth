using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TeleHealth.User_Service.Models
{
    public class ResponseModel
    {
        public bool Status { get; set; }
        public string Message { get; set; }
        public string Field { get; set; }
        public object Content { get; set; }
        public string Token { get; set; }

        public ResponseModel(bool status = false, string field = "") :
            this(status ? string.Empty : "Something went wrong. Please contact the administrator.", status, field)
        {
        }
        public ResponseModel(string message, bool status, string field = "")
        {
            Field = field;
            Status = status;
            Message = message;
        }

        public ResponseModel(object content, string message = "", bool status = true, string field = "")
        {
            Field = field;
            Status = status;
            Message = message;
            Content = content;
        }
    }
}
