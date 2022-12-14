using DataAccess.Models.Enum;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto.ExportProcess
{
    public class CreateExportProcessDto
    {
        public string IdExportPrice { set; get; } // Id giá hôm nay
        //public string IdGarden { set; get; } // IdGarden
        public StatusExport statusExport { set; get; } // Trạng thái xuất hàng
        public DateTime DateExport { get; set; } // tên


        public List<float> WeighBlue { get; set; } // số kg mỗi lần cân kem lớn
        public List<float> WeighGreen { get; set; } // số kg mỗi lần cân
        public List<float> WeighRed { get; set; } // số kg mỗi lần cân
        public List<float> WeighOrange { get; set; } // số kg mỗi lần cân


        public float SumOrange { get; set; } // tổng số 
        public float SumRed { get; set; } // tổng số 
        public float SumGreen { get; set; } // tổng số 
        public float SumBlue { get; set; } // tổng số 

        public float CountOrange { get; set; } // tổng số quả
        public float CountRed { get; set; } // tổng số quả
        public float CountGreen { get; set; } // tổng số quả
        public float CountBlue { get; set; } // tổng số quả

    }
}
