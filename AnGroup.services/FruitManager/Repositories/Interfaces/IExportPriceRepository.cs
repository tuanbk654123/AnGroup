

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportPrice;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace FruitManager.Repositories.Interfaces
{
    public interface IExportPriceRepository : IMongoDbBase<ExportPrice>
    {
        public Task<IPage<ExportPrice>> Search(IPageable pageable, SearchExportPriceDto searchExportPriceDto);
    }
}