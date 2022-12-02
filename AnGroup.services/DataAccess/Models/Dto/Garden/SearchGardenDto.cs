﻿using DataAccess.Models.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class SearchGardenDto
    {
        public string Name { get; set; } // tên
        public string AccountNumber { get; set; } // số tài khoản
        public string BankName { get; set; } // số tài khoản
        public string Address { get; set; } // địa chỉ 
        public string PhoneNumber { get; set; } // số điện thoại
    }
}
