using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.Pagination.Base;

namespace FruitManager.Services.Interfaces
{
    public interface IExportProcessService
    {

        Task<IPage<ExportProcess>> Search(IPageable pageable, SearchExportProcessDto searchExportProcessDto);
        
        Task<bool> Create(CreateExportProcessDto createExportProcessDto ,  CancellationToken cancellationToken = default);
        Task<bool> Update(UpdateExportProcessDto updateExportProcessDto , CancellationToken cancellationToken = default);
        Task<bool> Delete(string id, CancellationToken cancellationToken = default);
    }
}