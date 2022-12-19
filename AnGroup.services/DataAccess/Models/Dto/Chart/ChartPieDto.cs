using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccess.Models.Dto
{
    public class ChartPieDto
    {
        public float orange { get; set; }
        public float red { get; set; }
        public float blue { get; set; }
        public float green { get; set; }

    }
}
