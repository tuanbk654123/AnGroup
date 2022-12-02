using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("Bill")]
    public class Bill
    {
        public string Id { set; get; } // Id
        public string IdGarden { set; get; } // Id Garden
        public DateTime Date { get; set; } // ngày tại bill
        public string ImportProcess { set; get; } // Id ImportProcess

    }
}
