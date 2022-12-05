

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace FruitManager.Repositories.Interfaces
{
    public interface IGardenRepository : IMongoDbBase<Garden>
    {
        public Task<IPage<Garden>> Search(IPageable pageable, SearchGardenDto searchGardenDto);
        public Task<bool> Delete(string id);
    }
}