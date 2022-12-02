

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace FruitManager.Repositories.Interfaces
{
    public interface IUserLoginRepository : IMongoDbBase<UserLogin>
    {
        public Task<IPage<UserLogin>> Search(IPageable pageable, SearchUserLoginDto searchUserDto);
    }
}