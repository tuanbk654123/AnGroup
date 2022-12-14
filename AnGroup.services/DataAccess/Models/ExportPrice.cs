using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("ExportPrice")]
    public class ExportPrice
    {
        public string Id { set; get; } // Id
        public DateTime DateExport { get; set; } // tên
        public float PriceBlue { get; set; } // số tiền
        public float PriceGreen { get; set; } // số tiền
        public float PriceRed { get; set; } // số tiền
        public float PriceOrange { get; set; } // số tiền

 

    }
}
