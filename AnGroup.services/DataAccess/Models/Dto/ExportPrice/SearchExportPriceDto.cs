using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportPrice
{
    public class SearchExportPriceDto
    {
        public DateTime? fromDate { get; set; } // 
        public DateTime? toDate { get; set; } // 
    }
}
