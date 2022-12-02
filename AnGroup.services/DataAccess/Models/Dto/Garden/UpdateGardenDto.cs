using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class UpdateGardenDto
    {
        public string Id { set; get; } // Id
        public DateTime DateImport { get; set; } // tên
        public float PriceBlue { get; set; } // số tiền
        public float PriceGreen { get; set; } // số tiền
        public float PriceRed { get; set; } // số tiền
        public float PriceOrange { get; set; } // số tiền

        public float RateBlue { get; set; } // tỷ lệ
        public float RateGreen { get; set; } //  tỷ lệ
        public float RateRed { get; set; } //  tỷ lệ
        public float RateOrange { get; set; } //  tỷ lệ

    }
}
