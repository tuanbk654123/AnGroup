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
using DataAccess.Models.Dto.ExportProcess;

namespace FruitManager.Controllers
{
    [Route("api/ExportProcess")]
//    [Authorize]
    [ApiController]
    public class ExportProcessController : ControllerBase
    {
        private readonly IExportProcessService ExportProcessService;

        public ExportProcessController(IExportProcessService ExportProcessService )
        {
            this.ExportProcessService = ExportProcessService;
        }


        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<bool> Create(CreateExportProcessDto createExportProcessDto, CancellationToken cancellationToken)
        {
            bool create = await ExportProcessService.Create(createExportProcessDto, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchExportProcessDto searchExportProcessDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await ExportProcessService.Search(pageable, searchExportProcessDto));
        }
    }
}
