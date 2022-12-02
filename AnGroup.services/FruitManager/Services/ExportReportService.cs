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

    internal sealed class ExportReportService : IExportReportService
    {
        private readonly IExportReportRepository ExportReportRepository;


        public ExportReportService(IExportReportRepository  ExportReportRepository)
        {
            this.ExportReportRepository = ExportReportRepository;

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
    }
}