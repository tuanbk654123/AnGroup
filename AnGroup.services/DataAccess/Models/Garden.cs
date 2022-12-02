using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("Garden")]
    public class Garden
    {
        public string Id { set; get; } // Id
        public string Name { get; set; } // tên
        public string AccountNumber { get; set; } // số tài khoản
        public string BankName { get; set; } // số tài khoản
        public string Address { get; set; } // địa chỉ 
        public string PhoneNumber { get; set; } // số điện thoại

    }
}
