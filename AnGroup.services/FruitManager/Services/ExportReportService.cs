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
    }
}