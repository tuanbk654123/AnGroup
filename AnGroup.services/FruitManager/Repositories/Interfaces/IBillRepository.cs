

using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.MongoDbHelper.Interface;
using DataAccess.Pagination.Base;

namespace FruitManager.Repositories.Interfaces
{
    public interface IBillRepository : IMongoDbBase<Bill>
    {
        public Task<IPage<Bill>> Search(IPageable pageable, SearchBillDto searchBillDto);
    }
}