using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.Pagination.Base;
using System.Data;

namespace FruitManager.Services.Interfaces
{
    public interface IExportReportService
    {

        Task<IPage<ExportReport>> Search(IPageable pageable, SearchExportReportDto  searchExportReportDto);
        
        Task<bool> Create(CreateExportReportDto createExportReportDto, CancellationToken cancellationToken = default);
        Task<bool> Update(UpdateExportReportDto updateExportReportDto, CancellationToken cancellationToken = default);
        Task<byte[]> UpdateStatus(UpdateStatusExportReportDto updateStatusExportReportDto, CancellationToken cancellationToken = default);
        Task<bool> Delete(string id, CancellationToken cancellationToken = default);
        Task<ChartPieDto> ExportChart(DateTime? fromDate, DateTime? toDate);
    }
}