using DataAccess.Models.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class UpdateStatusExportReportDto
    {
        //public DateTime? FromDate { get; set; } // Ngày tìm
        //public DateTime? ToDate { get; set; } //  Ngày xuát báo cáo đến ngày 
        //public DateTime? DateRunCar { get; set; } // Ngày xe chạy
        public string Id { set; get; } // Id
        public string NameOwner { get; set; } // Tên chủ hàng
        public string LicenPalates { get; set; } // Biển số xe
    }
}
