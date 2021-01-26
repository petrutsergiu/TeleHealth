using System;
using System.Collections.Generic;
using System.Text;
using UserService.Data.Models;

namespace UserService.Data.DAL
{
    public interface IUserDAL
    {
        void CreateUser(User user);
        User LoginUser(User user);
    }
}
