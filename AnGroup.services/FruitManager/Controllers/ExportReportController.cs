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
    [Route("api/ExportReport")]
//    [Authorize]
    [ApiController]
    public class ExportReportController : ControllerBase
    {
        private readonly IExportReportService ExportReportService;

        public ExportReportController(IExportReportService ExportReportService )
        {
            this.ExportReportService = ExportReportService;
        }


        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<IActionResult> Create(CreateExportReportDto createExportReportDto, CancellationToken cancellationToken)
        {
            bool create = await ExportReportService.Create(createExportReportDto, cancellationToken);
            if (create)
            {
                return Ok("Tạo mới thành công");
            }
            return BadRequest("Tạo mới thất bại");
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchExportReportDto searchExportReportDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await ExportReportService.Search(pageable, searchExportReportDto));
        }
        [HttpPost("Update")]
        public async Task<IActionResult> Update(UpdateExportReportDto updateExportReportDto, CancellationToken cancellationToken)
        {
            bool create = await ExportReportService.Update(updateExportReportDto, cancellationToken);
            if (create)
            {
                return Ok("Sửa thành công");
            }
            return BadRequest("Sửa thất bại");
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromBody]string id, CancellationToken cancellationToken)
        {
            bool create = await ExportReportService.Delete(id, cancellationToken);
            if (create)
            {
                return Ok("Xóa thành công");
            }
            return BadRequest("Xóa thất bại");
        }

        [HttpPost("ExportStatus")]
        public async Task<IActionResult> UpdateStatus([FromBody] UpdateStatusExportReportDto updateStatusExportReportDto, CancellationToken cancellationToken)
        {
           // bool create = await ExportReportService.UpdateStatus(updateStatusExportReportDto, cancellationToken);
            byte[] fileContent = await ExportReportService.UpdateStatus(updateStatusExportReportDto);
            if (fileContent != null)
            {
                return File(fileContent, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "Bill.xlsx");

            }
            return BadRequest("Xuất báo cáo lỗi");
        }

    }
}
