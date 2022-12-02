using DataAccess.Models.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class CreateImportProcessDto
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

        public float SumWeighKemLon { get; set; } // số cân kem lớn
        public float SumWeighKem2 { get; set; } // số cân
        public float SumWeighKem3 { get; set; } // số cân
        public float SumWeighRXo { get; set; } // số cân
        public float SumWeighR1 { get; set; } // số cân
        public float SumWeighR2 { get; set; } // số cân
        public float SumWeighR3 { get; set; } // số cân

        public float TotalSumWeigh { get; set; } // tổng cân nặng
        public float TotalMoeny { get; set; } // tổng tiền

        public List<float> WeighKemLon { get; set; } // số kg mỗi lần cân kem lớn
        public List<float> WeighKem2 { get; set; } // số kg mỗi lần cân
        public List<float> WeighKem1 { get; set; } // số kg mỗi lần cân
        public List<float> WeighRXo { get; set; } // số kg mỗi lần cân
        public List<float> WeighR1 { get; set; } // số kg mỗi lần cân
        public List<float> WeighR2 { get; set; } // số kg mỗi lần cân
        public List<float> WeighR3 { get; set; } // số kg mỗi lần cân


    }
}
