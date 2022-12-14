using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportPrice
{
    public class UpdateExportPriceDto
    {
        public string Id { set; get; } // Id
        public DateTime DateExport { get; set; } // tên
        public float PriceBlue { get; set; } // số tiền
        public float PriceGreen { get; set; } // số tiền
        public float PriceRed { get; set; } // số tiền
        public float PriceOrange { get; set; } // số tiền



    }
}
