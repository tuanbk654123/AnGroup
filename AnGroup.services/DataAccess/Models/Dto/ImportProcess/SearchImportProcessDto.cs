using DataAccess.Models.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class SearchImportProcessDto
    {
        public DateTime? fromDate { get; set; } // 
        public DateTime? toDate { get; set; } // 
        public StatusBill? statusBill { set; get; } // Trạng hái thanh toán
    }
}
