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
    [Route("api/Garden")]
//    [Authorize]
    [ApiController]
    public class GardenController : ControllerBase
    {
        private readonly IGardenService GardenService;

        public GardenController(IGardenService GardenService )
        {
            this.GardenService = GardenService;
        }


        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<IActionResult> Create(CreateGardenDto createGardenDto, CancellationToken cancellationToken)
        {
            bool create = await GardenService.Create(createGardenDto, cancellationToken);
            if (create)
            {
                return Ok("Tạo mới thành công");
            }
            return BadRequest("Tạo mới thất bại");
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchGardenDto searchGardenDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await GardenService.Search(pageable, searchGardenDto));
        }
        [HttpPost("Update")]
        public async Task<IActionResult> Update(UpdateGardenDto updateGardenDto, CancellationToken cancellationToken)
        {
            bool create = await GardenService.Update(updateGardenDto, cancellationToken);
            if (create)
            {
                return Ok("Sửa thành công");
            }
            return BadRequest("Sửa thất bại");
        }

        [HttpPost("Delete")]
        public async Task<IActionResult> Delete([FromBody] string id, CancellationToken cancellationToken)
        {
            bool create = await GardenService.Delete(id, cancellationToken);
            if (create)
            {
                return Ok("Xoá thành công");
            }
            return BadRequest("Xoá thất bại");
        }
    }
}
