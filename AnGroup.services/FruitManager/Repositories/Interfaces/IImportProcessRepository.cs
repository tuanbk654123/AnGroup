

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace FruitManager.Repositories.Interfaces
{
    public interface IImportProcessRepository : IMongoDbBase<ImportProcess>
    {
        public Task<IPage<ImportProcess>> Search(IPageable pageable, SearchImportProcessDto searchImportProcessDto);
    }
}