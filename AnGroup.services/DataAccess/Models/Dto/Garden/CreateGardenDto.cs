using DataAccess.Models.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class CreateGardenDto
    {
        public string Name { get; set; } // tên
        public string AccountNumber { get; set; } // số tài khoản
        public BankType BankName { get; set; } // số tài khoản
        public string Address { get; set; } // địa chỉ 
        public string NameGarden { get; set; } // địa chỉ 
        public string PhoneNumber { get; set; } // số điện thoại
        public DateTime DateCreate { get; set; } // ngày tạo


    }
}
