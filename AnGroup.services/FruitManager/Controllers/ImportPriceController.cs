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
        public async Task<bool> Create(CreateImportPriceDto createImportPriceDto, CancellationToken cancellationToken)
        {
            bool create = await ImportPriceService.Create(createImportPriceDto, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchImportPriceDto searchImportPriceDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await ImportPriceService.Search(pageable, searchImportPriceDto));
        }
        [HttpPost("Update")]
        public async Task<bool> Update(UpdateImportPriceDto updateImportPriceDto, CancellationToken cancellationToken)
        {
            bool create = await ImportPriceService.Update(updateImportPriceDto, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }

        [HttpPost("Delete")]
        public async Task<bool> Delete(string id, CancellationToken cancellationToken)
        {
            bool create = await ImportPriceService.Delete(id, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }
    }
}
