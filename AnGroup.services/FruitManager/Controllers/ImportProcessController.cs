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
        public async Task<bool> Create(CreateImportProcessDto createImportProcessDto, CancellationToken cancellationToken)
        {
            bool create = await ImportProcessService.Create(createImportProcessDto, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchImportProcessDto searchImportProcessDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await ImportProcessService.Search(pageable, searchImportProcessDto));
        }
        [HttpPost("Update")]
        public async Task<bool> Update(UpdateImportProcessDto updateImportProcessDto, CancellationToken cancellationToken)
        {
            bool create = await ImportProcessService.Update(updateImportProcessDto, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }

        [HttpPost("Delete")]
        public async Task<bool> Delete(string id, CancellationToken cancellationToken)
        {
            bool create = await ImportProcessService.Delete(id, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }
    }
}
