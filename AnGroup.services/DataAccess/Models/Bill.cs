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


    }
}
