using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Pagination.Base;

namespace FruitManager.Services.Interfaces
{
    public interface IUserLoginService
    {

        Task<IPage<UserLogin>> Search(IPageable pageable, SearchUserLoginDto searchUserLoginDto);
        
        Task<bool> Create(CreateUserLoginDto createUserLoginDto,  CancellationToken cancellationToken = default);
    }
}