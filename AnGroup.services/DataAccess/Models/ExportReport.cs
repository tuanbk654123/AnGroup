using AspNetCore.Identity.MongoDbCore.Models;
using DataAccess.Models.Enum;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("ExportReport")]
    public class ExportReport
    {
        public string Id { set; get; } // Id
        public string IdExportPrice { set; get; } // Id
        public DateTime FromDate { get; set; } // từ Ngày export
        public DateTime ToDate { get; set; } // đến Ngày export
        public StatusExport statusExport { set; get; } // Trạng thái xuất hàng
        public float TotalNumber { get; set; } // tổng số trái
        public float TotalWeigtToTruck { get; set; } //Tổng số lên xe
        public float TotalPaper { get; set; } // Tổng trọng lượng giấy gói
        public float TotalWeigtReal { get; set; } // Tổng trọng lượng thực
        public float TotalMoeny { get; set; } // Tổng tiền

        public float CarFee { get; set; } // cước xe
        public float TotalPayment { get; set; } // Tổng thanh toán

        public string NameOwner { get; set; } // Tên chủ hàng
        public string LicenPalates { get; set; } // Biển số xe
    }
}
