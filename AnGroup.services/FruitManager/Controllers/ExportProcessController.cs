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
        public async Task<IActionResult> Create(CreateExportProcessDto createExportProcessDto, CancellationToken cancellationToken)
        {
            bool create = await ExportProcessService.Create(createExportProcessDto, cancellationToken);
            if (create)
            {
                return Ok("Tạo mới thành công");
            }
            return BadRequest("Tạo mới thất bại");
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchExportProcessDto searchExportProcessDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await ExportProcessService.Search(pageable, searchExportProcessDto));
        }
        [HttpPost("Update")]
        public async Task<IActionResult> Update(UpdateExportProcessDto updateExportProcessDto, CancellationToken cancellationToken)
        {
            bool create = await ExportProcessService.Update(updateExportProcessDto, cancellationToken);
            if (create)
            {
                return Ok("Sửa thành công");
            }
            return BadRequest("Sửa thất bại");
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromBody] string id, CancellationToken cancellationToken)
        {
            bool create = await ExportProcessService.Delete(id, cancellationToken);
            if (create)
            {
                return Ok("Xóa thành công");
            }
            return BadRequest("Xóa thất bại");
        }

        [HttpPost("ExportReport")]
        public async Task<IActionResult> ExportReport([FromBody] SearchReportDto searchReportDto, CancellationToken cancellationToken)
        {
            byte[] fileContent = await ExportProcessService.ExportReport(searchReportDto.fromDate, searchReportDto.toDate);
            if (fileContent != null)
            {
                return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Bill.xlsx");

            }
            return BadRequest("Xuất báo cáo lỗi");
        }
    }
}
