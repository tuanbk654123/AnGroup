

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace FruitManager.Repositories.Interfaces
{
    public interface IImportPriceRepository : IMongoDbBase<ImportPrice>
    {
        public Task<IPage<ImportPrice>> Search(IPageable pageable, SearchImportPriceDto searchImportPriceDto);
        public Task<bool> Delete(string id);
    }
}