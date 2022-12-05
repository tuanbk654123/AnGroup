

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace FruitManager.Repositories.Interfaces
{
    public interface IExportReportRepository : IMongoDbBase<ExportReport>
    {
        public Task<IPage<ExportReport>> Search(IPageable pageable, SearchExportReportDto searchExportReportDto);
        public Task<bool> Delete(string id);
    }
}