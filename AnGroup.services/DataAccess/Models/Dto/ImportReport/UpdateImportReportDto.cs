using DataAccess.Models.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class UpdateImportReportDto
    {
        public string Id { set; get; } // Id
        public DateTime DateImport { get; set; } // Ngày nhập

        public float PriceKemLon { get; set; } // số tiền
        public float PriceKem2 { get; set; } // số tiền
        public float PriceKem3 { get; set; } // số tiền
        public float PriceRXo { get; set; } // số tiền
        public float PriceR1 { get; set; } // số tiền
        public float PriceR2 { get; set; } // số tiền
        public float PriceR3 { get; set; } // số tiền

        public float RateKemLon { get; set; } // tỷ lệ
        public float RateKem2 { get; set; } //  tỷ lệ
        public float RateKem3 { get; set; } //  tỷ lệ
        public float RateRXo { get; set; } //  tỷ lệ
        public float RateR1 { get; set; } //  tỷ lệ
        public float RateR2 { get; set; } //  tỷ lệ
        public float RateR3 { get; set; } // tỷ lệ

        public float SumKgK { get; set; } // tổng số quả K tính theo Kg
        public float SumKgR { get; set; } //  tổng số quả R tính theo Kg
        public float SumMoneyK { get; set; } // tổng số tiền K tính theo VNĐ
        public float SumMoneyR { get; set; } //  tổng số tiền R tính theo VNĐ
        public float SumKg { get; set; } // tổng số Kg
        public float SumMoney { get; set; } //  tổng số Tiền


    }
}
