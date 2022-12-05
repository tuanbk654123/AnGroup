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
    [Route("api/Bill")]
//    [Authorize]
    [ApiController]
    public class BillController : ControllerBase
    {
        private readonly IBillService BillService;

        public BillController(IBillService BillService )
        {
            this.BillService = BillService;
        }


        [HttpPost("Create")]

        public async Task<bool> Create(CreateBillDto createBillDto, CancellationToken cancellationToken)
        {
            bool create = await BillService.Create(createBillDto, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchBillDto searchBillDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await BillService.Search(pageable, searchBillDto));
        }

        [HttpPost("Update")]
        public async Task<bool> Update(UpdateBillDto updateBillDto, CancellationToken cancellationToken)
        {
            bool create = await BillService.Update(updateBillDto, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }

        [HttpPost("Delete")]
        public async Task<bool> Delete(string id, CancellationToken cancellationToken)
        {
            bool create = await BillService.Delete(id, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }
    }
}
