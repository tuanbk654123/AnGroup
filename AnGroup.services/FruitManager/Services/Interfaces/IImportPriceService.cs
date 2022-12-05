using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.Pagination.Base;

namespace FruitManager.Services.Interfaces
{
    public interface IImportPriceService
    {

        Task<IPage<ImportPrice>> Search(IPageable pageable, SearchImportPriceDto  searchImportPriceDto );
        
        Task<bool> Create(CreateImportPriceDto createImportPriceDto,  CancellationToken cancellationToken = default);
        Task<bool> Update(UpdateImportPriceDto updateImportPriceDto, CancellationToken cancellationToken = default);
        Task<bool> Delete(string id, CancellationToken cancellationToken = default);
    }
}