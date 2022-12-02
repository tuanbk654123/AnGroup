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


}
