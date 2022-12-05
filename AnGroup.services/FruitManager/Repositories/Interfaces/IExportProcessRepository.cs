

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace FruitManager.Repositories.Interfaces
{
    public interface IExportProcessRepository : IMongoDbBase<ExportProcess>
    {
        public Task<IPage<ExportProcess>> Search(IPageable pageable, SearchExportProcessDto searchExportProcessDto);
        public Task<bool> Delete(string id);
    }
}