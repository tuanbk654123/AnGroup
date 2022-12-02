using DataAccess.Models.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class SearchExportProcessDto
    {
        public DateTime? fromDate { get; set; } // 
        public DateTime? toDate { get; set; } // 
        public StatusExport statusExport { set; get; } // Trạng thái xuất hàng
    }
}
