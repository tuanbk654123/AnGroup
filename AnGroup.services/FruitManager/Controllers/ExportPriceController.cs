using System.Threading;
using System.Threading.Tasks;
using FruitManager.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

using System.Collections.Generic;
using System.Linq;

using Microsoft.Extensions.Configuration;
using System.Security.Cryptography;
using System;

using Microsoft.Extensions.Caching.Distributed;
using System.Net;

using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http.Features;

using System.Text;
using DataAccess.Models;
using Microsoft.AspNetCore.Identity;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;
using FruitManager.Services;
using DataAccess.ExceptionFilter.Exceptions;
using Microsoft.AspNetCore.Authorization;

using System.Data;
using DataAccess.Models.Dto.ExportPrice;

namespace FruitManager.Controllers
{
    [Route("api/ExportPrice")]
//    [Authorize]
    [ApiController]
    public class ExportPriceController : ControllerBase
    {
        private readonly IExportPriceService ExportPriceService;

        public ExportPriceController(IExportPriceService ExportPriceService )
        {
            this.ExportPriceService = ExportPriceService;
        }


        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<bool> Create(CreateExportPriceDto createExportPriceDto, CancellationToken cancellationToken)
        {
            bool create = await ExportPriceService.Create(createExportPriceDto, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchExportPriceDto searchExportPriceDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await ExportPriceService.Search(pageable, searchExportPriceDto));
        }
    }
}
