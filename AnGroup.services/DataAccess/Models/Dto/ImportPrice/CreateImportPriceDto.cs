using DataAccess.Models.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class CreateImportPriceDto
    {
        public DateTime DateImport { get; set; } // tên
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
    }
}
