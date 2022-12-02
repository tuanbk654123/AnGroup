

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace FruitManager.Repositories.Interfaces
{
    public interface IImportReportRepository : IMongoDbBase<ImportReport>
    {
        public Task<IPage<ImportReport>> Search(IPageable pageable, SearchImportReportDto searchImportReportDto);
    }
}