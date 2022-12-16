using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;

namespace DataAccess.Models.Enum
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum StatusBill
    {

        [Description("Chưa thanh toán")]
        [EnumMember(Value = "1")]
        CHUA_THANH_TOAN,
        [Description("Đã Thanh toán")]
        [EnumMember(Value = "2")]
        DA_THANH_TOAN
    }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum StatusExport
    {

        [Description("Đã xử lý")]
        [EnumMember(Value = "1")]
        DA_XU_LY,
        [Description("Chưa xử lý")]
        [EnumMember(Value = "2")]
        CHUA_XU_LY
    }
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum BankType
    {
        [Description("Ngân hàng TMCP Xây Dựng")]
        [EnumMember(Value = "1")]
        CBBANK,
        [Description("Ngân hàng TMCP Dầu Khí Toàn Cầu")]
        [EnumMember(Value = "2")]
        GPBANK,
        [Description("Ngân hàng TMCP Xây Dựng")]
        [EnumMember(Value = "3")]
        OCEANBANK,
        [Description("Ngân hàng TMCP Nông Nghiệp và Phát triển nông thôn Việt Nam")]
        [EnumMember(Value = "4")]
        AGRIBANK, 
        [Description("Ngân hàng 100% vốn nước ngoài")]
        [EnumMember(Value = "5")]
        Hong_Leong_Bank_Vietnam,
        [Description("Ngân hàng 100% vốn nước ngoài")]
        [EnumMember(Value = "6")]
        Public_Bank,
        [Description("Ngân hàng ANZ Việt Nam")]
        [EnumMember(Value = "7")]
        ANZ,
        [Description("Hong Leong Bank Vietnam")]
        [EnumMember(Value = "8")]
        Hong_Leong_Bank,
        [Description("Standard Chartered Việt Nam")]
        [EnumMember(Value = "9")]
        Standard_Chartered_Bank,
        [Description("Shinhan Bank Vietnam Limited – SHBVN")]
        [EnumMember(Value = "10")]
        SHINHANBANK,
        [Description("Hongkong-Shanghai Bank")]
        [EnumMember(Value = "11")]
        HSBC,
        [Description("Ngân hàng Hợp tác xã Việt Nam")]
        [EnumMember(Value = "12")]
        COOP_BANK,
        [Description("Ngân hàng liên doanh Việt – Nga")]
        [EnumMember(Value = "13")]
        VRB,
        [Description("Ngân hàng TNHH Indovina")]
        [EnumMember(Value = "14")]
        Indovina_Bank,
        [Description("Ngân hàng TMCP Viet Nam Thương Tín")]
        [EnumMember(Value = "15")]
        VIETBANK,
        [Description("Ngân hàng 100% vốn nước ngoài")]
        [EnumMember(Value = "16")]
        NCB,
        [Description("Ngân hàng TMCP Xăng dầu Petrolimex")]
        [EnumMember(Value = "17")]
        PGBANK,
        [Description("Ngân hàng TMCP Sài Gòn Công Thương")]
        [EnumMember(Value = "18")]
        SAIGONBANK,
        [Description("Ngân hàng TMCP Bảo Việt")]
        [EnumMember(Value = "19")]
        BAOVIET_BANK,
        [Description("Ngân hàng TMCP Bản Việt")]
        [EnumMember(Value = "20")]
        VIETCAPITAL,
        [Description("Ngân hàng TMCP Kiên Long")]
        [EnumMember(Value = "21")]
        KIENLONGBANK,
        [Description("Ngân hàng TMCP Nam Á")]
        [EnumMember(Value = "22")]
        NAMABANK,
        [Description("Ngân hàng TMCP Việt Á")]
        [EnumMember(Value = "23")]
        VIETABANK,
        [Description("Ngân hàng TMCP Đông Á")]
        [EnumMember(Value = "24")]
        DONGABANK,
        [Description("Ngân hàng TMCP Bắc Á")]
        [EnumMember(Value = "25")]
        BAC_A_BANK,
        [Description("Ngân hàng TMCP Đông Nam Á")]
        [EnumMember(Value = "26")]
        SEABANK,
        [Description("Ngân hàng TMCP An Bình")]
        [EnumMember(Value = "27")]
        ABBANK,
        [Description("Ngân hàng TMCP Liên Việt")]
        [EnumMember(Value = "28")]
        Lienviet_Post_Bank,
        [Description("Ngân hàng TMCP Phương Đông")]
        [EnumMember(Value = "29")]
        OCB,
        [Description("Ngân hàng TMCP Tiên Phong")]
        [EnumMember(Value = "30")]
        TPBANK,
        [Description("Ngân hàng TMCP Kỹ Thương")]
        [EnumMember(Value = "31")]
        TECHCOMBANK,
        [Description("Ngân hàng TMCP PVCombank")]
        [EnumMember(Value = "32")]
        PVcomBank,
        [Description("Ngân hàng TMCP Quốc Tế")]
        [EnumMember(Value = "33")]
        VIB,
        [Description("Ngân hàng TMCP Hàng Hải")]
        [EnumMember(Value = "34")]
        MSB,
        [Description("Ngân hàng TMCP Phát Triển TP HCM")]
        [EnumMember(Value = "35")]
        HDBANK,
        [Description("Ngân hàng TMCP Sài Gòn Hà Nội")]
        [EnumMember(Value = "36")]
        SHB,
        [Description("Ngân hàng TMCP Xuất Nhập Khẩu")]
        [EnumMember(Value = "37")]
        EXIMBANK,
        [Description("Ngân hàng TMCP Á Châu")]
        [EnumMember(Value = "38")]
        ACB,
        [Description("Ngân hàng TMCP Sài Gòn")]
        [EnumMember(Value = "39")]
        SCB,
        [Description("Ngân hàng TMCP Việt Nam Thịnh Vượng")]
        [EnumMember(Value = "40")]
        VPBANK,
        [Description("Ngân hàng TMCP Quân Đội")]
        [EnumMember(Value = "41")]
        MBBANK,
        [Description("Ngân hàng TMCP Sài Gòn Thương Tín")]
        [EnumMember(Value = "42")]
        SACOMBANK,
        [Description("Ngân hàng TMCP Ngoại thương")]
        [EnumMember(Value = "43")]
        VIETCOMBANK,
        [Description("Ngân hàng TMCP Đầu Tư Phát Triển Việt Nam")]
        [EnumMember(Value = "44")]
        BIDV,
        [Description("Ngân hàng TMCP Công Thương")]
        [EnumMember(Value = "45")]
        VIETINBANK,
    }
}
