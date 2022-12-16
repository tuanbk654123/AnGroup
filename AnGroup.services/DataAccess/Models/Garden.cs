using AspNetCore.Identity.MongoDbCore.Models;
using DataAccess.Models.Enum;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("Garden")]
    public class Garden
    {
        public string Id { set; get; } // Id
        public string Name { get; set; } // tên tài khoản
        public string NameGarden { get; set; } // tên vựa
        public string AccountNumber { get; set; } // số tài khoản
        //public string BankName { get; set; } // tên ngân hàng
        public BankType BankName { get; set; } // tên ngân hàng
        
        public string Address { get; set; } // địa chỉ 
        public string PhoneNumber { get; set; } // số điện thoại
        public DateTime DateCreate { get; set; } // ngày tạo

    }
}
