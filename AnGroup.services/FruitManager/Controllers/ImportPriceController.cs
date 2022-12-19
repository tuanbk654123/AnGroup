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
using DataAccess.Models.Dto.ExportPrice;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace FruitManager.Controllers
{
    [Route("api/ImportPrice")]
//    [Authorize]
    [ApiController]
    public class ImportPriceController : ControllerBase
    {
        private readonly IImportPriceService ImportPriceService;

        public ImportPriceController(IImportPriceService ImportPriceService )
        {
            this.ImportPriceService = ImportPriceService;
        }


        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<IActionResult> Create(CreateImportPriceDto createImportPriceDto, CancellationToken cancellationToken)
        {
            // Kiểm tra đã tồn tại bản ghi giá của ngày hôm đó chưa
            Pageable pageable = new Pageable();
            pageable.PageNumber = 1;
            pageable.PageSize = 10;
            SearchImportPriceDto searchImportPriceDto = new SearchImportPriceDto();
            searchImportPriceDto.fromDate = createImportPriceDto.DateImport;
            searchImportPriceDto.toDate = createImportPriceDto.DateImport;

            var checkHaveItem = await ImportPriceService.Search(pageable, searchImportPriceDto);
            if(checkHaveItem!= null && checkHaveItem.Content.Count() > 0) return BadRequest("Đã tồn tại bản ghi ngày "+ createImportPriceDto.DateImport.ToString("dd-MM-yyyy"));

            bool create = await ImportPriceService.Create(createImportPriceDto, cancellationToken);
            if (create)
            {
                return Ok("Tạo mới thành công");
            }
            return BadRequest("Tạo mới thất bại");
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchImportPriceDto searchImportPriceDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await ImportPriceService.Search(pageable, searchImportPriceDto));
        }
        [HttpPost("Update")]
        public async Task<IActionResult> Update(UpdateImportPriceDto updateImportPriceDto, CancellationToken cancellationToken)
        {
            bool create = await ImportPriceService.Update(updateImportPriceDto, cancellationToken);
            if (create)
            {
                return Ok("Sửa thành công");
            }
            return BadRequest("Sửa thất bại");
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromBody] string id, CancellationToken cancellationToken)
        {
            bool delete = await ImportPriceService.Delete(id, cancellationToken);
            if (delete)
            {
                return Ok("Xoá thành công");
            }
            return BadRequest("Xoá thất bại");
        }
    }
}
