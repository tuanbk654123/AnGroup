using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Mapster;
using FruitManager.Repositories.Interfaces;

namespace FruitManager.Services
{
    using System;
    using DataAccess.Models;
    using DataAccess.Models.Dto;
    using DataAccess.Pagination.Base;
    using Interfaces;
    using DataAccess.Models.Dto.ExportProcess;
    using DataAccess.ExceptionFilter.Exceptions;
    using DataAccess.Models.Enum;
    using FruitManager.Repositories;

    internal sealed class ExportReportService : IExportReportService
    {
        private readonly IExportReportRepository ExportReportRepository;
        private readonly IExportProcessService ExportProcessService;
            
        private readonly IExportProcessRepository ExportProcessRepository;

        public ExportReportService(IExportReportRepository ExportReportRepository, IExportProcessService exportProcessService = null, IExportProcessRepository exportProcessRepository = null)
        {
            this.ExportReportRepository = ExportReportRepository;
            ExportProcessService = exportProcessService;
            ExportProcessRepository = exportProcessRepository;
        }

        public async Task<bool> Create(CreateExportReportDto createExportReportDto, CancellationToken cancellationToken = default)
        {

            ExportReport? ExportReport = new ExportReport();
            ExportReport = createExportReportDto?.Adapt<ExportReport>();
            ExportReport.Id = Guid.NewGuid().ToString();
            var result = await ExportReportRepository.UpdateAsync(x => x.Id, ExportReport, true);
            return result;
        }

        public async Task<IPage<ExportReport>> Search(IPageable pageable, SearchExportReportDto searchExportReportDto)
        {
            return await ExportReportRepository.Search(pageable, searchExportReportDto);
        }
        public async Task<bool> Update(UpdateExportReportDto updateExportReportDto, CancellationToken cancellationToken = default)
        {
            var ExportReport = updateExportReportDto.Adapt<ExportReport>();
            return await ExportReportRepository.UpdateAsync(x => x.Id, ExportReport, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var ExportReport = await ExportReportRepository.GetByIndexAsync(x => x.Id, id);
            if (ExportReport != null)
            {
                return await ExportReportRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }

        public async Task<byte[]> UpdateStatus(UpdateStatusExportReportDto updateStatusExportReportDto, CancellationToken cancellationToken = default)
        {
            ExportReport exportReport = await ExportReportRepository.GetByIndexAsync(x => x.Id, updateStatusExportReportDto.Id);
            if (exportReport == null) return null;
            exportReport.NameOwner = updateStatusExportReportDto.NameOwner;
            exportReport.LicenPalates = updateStatusExportReportDto.LicenPalates;
            exportReport.statusExport = StatusExport.DA_XU_LY;
            await ExportReportRepository.UpdateAsync(x => x.Id, exportReport, false, cancellationToken);
            // Xuất báo cáo
            return await ExportProcessService.ExportReportTwo(exportReport.FromDate, exportReport.ToDate , updateStatusExportReportDto);


        }

        public async Task<ChartPieDto> ExportChart(DateTime? fromDate, DateTime? toDate)
        {
            //xử lý tiền dữ liệu
            fromDate = fromDate.Value;
            toDate = toDate.Value;
            Pageable pageable = new Pageable();
            pageable.PageNumber = 1;
            pageable.PageSize = 100;
            SearchExportProcessDto searchExportProcessDto = new SearchExportProcessDto();
            searchExportProcessDto.fromDate = fromDate;
            searchExportProcessDto.toDate = toDate;
            var a = await ExportProcessRepository.Search(pageable, searchExportProcessDto);
            List<ExportProcess> exportProcess = (List<ExportProcess>)a.Content;
            float orange = 0;
            float red = 0;
            float blue = 0;
            float green = 0;
            ChartPieDto chartPieDto = new ChartPieDto();
            for (int i = 0; i < exportProcess.Count; i++)
            {
                orange += exportProcess[i].SumOrange;
                red += exportProcess[i].SumRed;
                blue += exportProcess[i].SumBlue;
                green += exportProcess[i].SumGreen;
            }
            chartPieDto.orange = orange;
            chartPieDto.red = red;
            chartPieDto.blue = blue;
            chartPieDto.green = green;
            return chartPieDto;
        }
    }
}