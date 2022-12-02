using DataAccess.Models.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class CreateBillDto
    {
        public string IdGarden { set; get; } // Id Garden
        public DateTime Date { get; set; } // ngày tại bill
        public string ImportProcess { set; get; } // Id ImportProcess

    }
}
