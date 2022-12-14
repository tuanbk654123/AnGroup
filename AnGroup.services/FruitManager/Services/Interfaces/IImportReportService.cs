using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.Pagination.Base;

namespace FruitManager.Services.Interfaces
{
    public interface IImportReportService
    {

        Task<IPage<ImportReport>> Search(IPageable pageable, SearchImportReportDto searchImportReportDto  );
        
        Task<bool> Create(CreateImportReportDto createImportReportDto,  CancellationToken cancellationToken = default);
        Task<bool> Update(UpdateImportReportDto updateImportReporDto, CancellationToken cancellationToken = default);
        Task<bool> Delete(string id, CancellationToken cancellationToken = default);
    }
}