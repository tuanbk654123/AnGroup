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

namespace FruitManager.Controllers
{
    [Route("api/usersLogin")]
//    [Authorize]
    [ApiController]
    public class UserLoginController : ControllerBase
    {
        private readonly IUserLoginService userLoginService;

        public UserLoginController(IUserLoginService userLoginService )
        {
            this.userLoginService = userLoginService;
        }


        [HttpPost("Create")]
        [AllowAnonymous]
        public async Task<bool> Create(CreateUserLoginDto createUserLoginDto, CancellationToken cancellationToken)
        {
            bool create = await userLoginService.Create(createUserLoginDto, cancellationToken);
            if (create)
            {
                return true;
            }
            return false;
        }


        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] Pageable pageable, [FromQuery] SearchUserLoginDto searchUserLoginDto, CancellationToken cancellationToken)
        {
            if (pageable == null || pageable.PageSize == 0)
                return BadRequest("Dữ liệu phân trang không đúng");
            return Ok( await userLoginService.Search(pageable, searchUserLoginDto));
        }
    }
}
