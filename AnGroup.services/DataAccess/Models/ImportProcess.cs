using AspNetCore.Identity.MongoDbCore.Models;
using DataAccess.Models.Enum;
using MongoDbGenericRepository.Attributes;
using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    [CollectionName("ImportProcess")]
    public class ImportProcess
    {
        public string Id { set; get; } // Id
        public string IdImportPrice { set; get; } // Id giá hôm nay
        public string IdGarden { set; get; } // IdGarden
        public StatusBill statusBill { set; get; } // Trạng hái thanh toán
        public DateTime DateImport { get; set; } // tên

        public float SumPriceKemLon { get; set; } // số tiền
        public float SumPriceKem2 { get; set; } // số tiền
        public float SumPriceKem3 { get; set; } // số tiền
        public float SumPriceRXo { get; set; } // số tiền
        public float SumPriceR1 { get; set; } // số tiền
        public float SumPriceR2 { get; set; } // số tiền
        public float SumPriceR3 { get; set; } // số tiền

        public List<float> WeighKemLon { get; set; } // số kg mỗi lần cân kem lớn
        public List<float> WeighKem2 { get; set; } // số kg mỗi lần cân
        public List<float> WeighKem1 { get; set; } // số kg mỗi lần cân
        public List<float> WeighRXo { get; set; } // số kg mỗi lần cân
        public List<float> WeighR1 { get; set; } // số kg mỗi lần cân
        public List<float> WeighR2 { get; set; } // số kg mỗi lần cân
        public List<float> WeighR3 { get; set; } // số kg mỗi lần cân

    }
}
