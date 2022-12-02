using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.Pagination.Base;

namespace FruitManager.Services.Interfaces
{
    public interface IBillService
    {

        Task<IPage<Bill>> Search(IPageable pageable, SearchBillDto searchBillDto );
        
        Task<bool> Create(CreateBillDto createBillDto,  CancellationToken cancellationToken = default);
    }
}