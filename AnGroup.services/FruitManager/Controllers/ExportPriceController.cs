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
using DataAccess.Models.Dto.ExportProcess;

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
        public async Task<IActionResult> Create(CreateExportPriceDto createExportPriceDto, CancellationToken cancellationToken)
        {
            // Kiểm tra đã tồn tại bản ghi giá của ngày hôm đó chưa
            Pageable pageable = new Pageable();
            pageable.PageNumber = 1;
            pageable.PageSize = 10;
            SearchExportPriceDto searchExportPriceDto = new SearchExportPriceDto();
            searchExportPriceDto.fromDate = createExportPriceDto.DateExport;
            searchExportPriceDto.toDate = createExportPriceDto.DateExport;

            var checkHaveItem = await ExportPriceService.Search(pageable, searchExportPriceDto);
            if (checkHaveItem != null && checkHaveItem.Content.Count() > 0) return BadRequest("Đã tồn tại bản ghi ngày " + createExportPriceDto.DateExport.ToString("dd-MM-yyyy"));
            bool create = await ExportPriceService.Create(createExportPriceDto, cancellationToken);
            if (create)
            {
                return Ok("Tạo mới thành công");
            }
            return BadRequest("Tạo mới thất bại");
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchExportPriceDto searchExportPriceDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await ExportPriceService.Search(pageable, searchExportPriceDto));
        }
        [HttpPost("Update")]
        public async Task<IActionResult> Update(UpdateExportPriceDto updateExportPriceDto, CancellationToken cancellationToken)
        {
            // Kiểm tra đã tồn tại bản ghi giá của ngày hôm đó chưa
            Pageable pageable = new Pageable();
            pageable.PageNumber = 1;
            pageable.PageSize = 10;
            SearchExportPriceDto searchExportPriceDto = new SearchExportPriceDto();
            searchExportPriceDto.fromDate = updateExportPriceDto.DateExport;
            searchExportPriceDto.toDate = updateExportPriceDto.DateExport;

            var checkHaveItem = await ExportPriceService.Search(pageable, searchExportPriceDto);


            if (checkHaveItem != null && checkHaveItem.Content.Count() > 0)
            {
                List<ExportPrice> importPrice = (List<ExportPrice>)checkHaveItem.Content;
                if (importPrice[0].Id != updateExportPriceDto.Id)
                {
                    return BadRequest("Đã tồn tại bản ghi ngày " + updateExportPriceDto.DateExport.ToString("dd-MM-yyyy"));
                }

            }
         
            bool create = await ExportPriceService.Update(updateExportPriceDto, cancellationToken);
            if (create)
            {
                return Ok("Sửa thành công");
            }
            return BadRequest("Sửa thất bại");
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromBody] string id, CancellationToken cancellationToken)
        {
            bool create = await ExportPriceService.Delete(id, cancellationToken);
            if (create)
            {
                return Ok("Xóa thành công");
            }
            return BadRequest("Xóa thất bại");
        }
    }
}
