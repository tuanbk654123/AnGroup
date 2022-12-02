using AspNetCore.Identity.MongoDbCore.Models;
using MongoDbGenericRepository.Attributes;
using System;

namespace DataAccess.Models
{
    [CollectionName("ExportReport")]
    public class ExportReport
    {
        public string Id { set; get; } // Id
        public string IdExportPrice { set; get; } // Id
        public DateTime DateExport { get; set; } // Ngày export
        public float PriceBlue { get; set; } // số tiền
        public float PriceGreen { get; set; } // số tiền
        public float PriceRed { get; set; } // số tiền
        public float PriceOrange { get; set; } // số tiền

        public float NunberOfBlue { get; set; } // số Quả
        public float NunberOfGreen { get; set; } // số 
        public float NunberOfRed { get; set; } // số 
        public float NunberOfOrange { get; set; } // số 

        public float WeigtToTruckOfBlue { get; set; } //  trọng lượng lên xe
        public float WeigtToTruckOfGreen { get; set; } // 
        public float WeigtToTruckOfRed { get; set; } // 
        public float WeigtToTruckOfOrange { get; set; } //

        public float WeigtPaperOfBlue { get; set; } // trọng lượng giấy gói
        public float WeigtPaperOfGreen { get; set; } //
        public float WeigtPaperOfRed { get; set; } // 
        public float WeigtPaperOfOrange { get; set; } // 

        public float WeigtRealOfBlue { get; set; } // trọng lượng thực
        public float WeigtRealOfGreen { get; set; } //
        public float WeigtRealOfRed { get; set; } // 
        public float WeigtRealOfOrange { get; set; } // 

        public float MoenyOfBlue { get; set; } // thành tiền
        public float MoenyOfGreen { get; set; } //
        public float MoenyOfRed { get; set; } // 
        public float MoenyOfOrange { get; set; } // 


        public float TotalNumber { get; set; } // tổng số trái
        public float TotalWeigtToTruck { get; set; } //Tổng số lên xe
        public float TotalPaper { get; set; } // Tổng trọng lượng giấy gói
        public float TotalWeigtReal { get; set; } // Tổng trọng lượng thực
        public float TotalMoeny { get; set; } // Tổng trọng lượng thực

        public float CarFee { get; set; } // cước xe
        public float TotalPayment { get; set; } // Tổng thanh toán
    }
}
