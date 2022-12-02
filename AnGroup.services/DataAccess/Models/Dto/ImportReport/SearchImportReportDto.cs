using DataAccess.Models.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class SearchImportReportDto
    {
        public DateTime? fromDate { get; set; } // 
        public DateTime? toDate { get; set; } // 
    }
}
