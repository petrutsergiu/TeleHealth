using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading.Tasks;

namespace TeleHealth.User_Service
{
    public static class Enums
    {
        public enum Roles
        {
            Patient = 0,
            Doctor = 1,
            Admin = 2
        }
    }
}
