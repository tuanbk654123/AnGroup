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
    [Route("api/ImportProcess")]
//    [Authorize]
    [ApiController]
    public class ImportProcessController : ControllerBase
    {
        private readonly IImportProcessService ImportProcessService;

        public ImportProcessController(IImportProcessService ImportProcessService )
        {
            this.ImportProcessService = ImportProcessService;
        }


        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<IActionResult> Create(CreateImportProcessDto createImportProcessDto, CancellationToken cancellationToken)
        {
            bool create = await ImportProcessService.Create(createImportProcessDto, cancellationToken);
            if (create)
            {
                return Ok("Tạo mới thành công");
            }
            return BadRequest("Tạo mới thất bại");
        }

        [HttpPost("CreateList")]
        [AllowAnonymous]
        public async Task<IActionResult> Create(List< CreateImportProcessDto> createImportProcessDtos, CancellationToken cancellationToken)
        {
            foreach (var process in createImportProcessDtos)
            {
                bool create = await ImportProcessService.Create(process, cancellationToken);
                if (!create)
                {
                    return BadRequest("Tạo mới thất bại");
                }
            }
            return Ok("Tạo mới thành công");
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchImportProcessDto searchImportProcessDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await ImportProcessService.Search(pageable, searchImportProcessDto));
        }
        [HttpPost("Update")]
        public async Task<IActionResult> Update(UpdateImportProcessDto updateImportProcessDto, CancellationToken cancellationToken)
        {
            bool create = await ImportProcessService.Update(updateImportProcessDto, cancellationToken);
            if (create)
            {
                return Ok("Sửa thành công");
            }
            return BadRequest("Sửa thất bại");
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete(string id, CancellationToken cancellationToken)
        {
            bool create = await ImportProcessService.Delete(id, cancellationToken);
            if (create)
            {
                return Ok("Xoá thành công");
            }
            return BadRequest("Xoá thất bại");
        }
    }
}
