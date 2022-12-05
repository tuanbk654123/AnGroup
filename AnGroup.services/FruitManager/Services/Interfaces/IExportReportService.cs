using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.Pagination.Base;

namespace FruitManager.Services.Interfaces
{
    public interface IExportReportService
    {

        Task<IPage<ExportReport>> Search(IPageable pageable, SearchExportReportDto  searchExportReportDto);
        
        Task<bool> Create(CreateExportReportDto createExportReportDto  ,  CancellationToken cancellationToken = default);
        Task<bool> Update(UpdateExportReportDto updateExportReportDto, CancellationToken cancellationToken = default);
        Task<bool> Delete(string id, CancellationToken cancellationToken = default);
    }
}