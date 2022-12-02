﻿using AspNetCore.Identity.MongoDbCore.Models;
using DataAccess.Models.Enum;
using MongoDbGenericRepository.Attributes;
using System;
using System.Collections.Generic;

namespace DataAccess.Models
{
    [CollectionName("ExportProcess")]
    public class ExportProcess
    {
        public string Id { set; get; } // Id
        public string IdExportPrice { set; get; } // Id giá hôm nay
        //public string IdGarden { set; get; } // IdGarden
        public StatusExport statusExport { set; get; } // Trạng thái xuất hàng
        public DateTime DateExport { get; set; } // tên


        public List<float> WeighKemLon { get; set; } // số kg mỗi lần cân kem lớn
        public List<float> WeighKem2 { get; set; } // số kg mỗi lần cân
        public List<float> WeighKem1 { get; set; } // số kg mỗi lần cân
        public List<float> WeighRXo { get; set; } // số kg mỗi lần cân
        public List<float> WeighR1 { get; set; } // số kg mỗi lần cân
        public List<float> WeighR2 { get; set; } // số kg mỗi lần cân
        public List<float> WeighR3 { get; set; } // số kg mỗi lần cân


        public float SumKemLon { get; set; } // tổng số 
        public float SumKem2 { get; set; } // tổng số 
        public float SumKem1 { get; set; } // tổng số 
        public float SumRxo { get; set; } // tổng số 
        public float SumR1 { get; set; } // tổng số 
        public float SumR2 { get; set; } // tổng số 
        public float SumR3 { get; set; } // tổng số 

    }
}
