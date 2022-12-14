using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportPrice;
using DataAccess.Pagination.Base;

namespace FruitManager.Services.Interfaces
{
    public interface IExportPriceService
    {

        Task<IPage<ExportPrice>> Search(IPageable pageable, SearchExportPriceDto searchExportPriceDto );
        
        Task<bool> Create(CreateExportPriceDto createExportPriceDto,  CancellationToken cancellationToken = default);
        Task<bool> Update(UpdateExportPriceDto updateExportPriceDto, CancellationToken cancellationToken = default);
        Task<bool> Delete(string id, CancellationToken cancellationToken = default);
    }
}