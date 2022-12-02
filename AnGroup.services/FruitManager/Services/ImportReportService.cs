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

    internal sealed class ImportReportService : IImportReportService
    {
        private readonly IImportReportRepository ImportReportRepository;


        public ImportReportService(IImportReportRepository  ImportReportRepository)
        {
            this.ImportReportRepository = ImportReportRepository;

        }

        public async Task<bool> Create(CreateImportReportDto createImportReportDto, CancellationToken cancellationToken = default)
        {

            ImportReport? ImportReport = new ImportReport();
            ImportReport = createImportReportDto?.Adapt<ImportReport>();
            ImportReport.Id = Guid.NewGuid().ToString();
            var result = await ImportReportRepository.UpdateAsync(x => x.Id, ImportReport, true);
            return result;
        }

        public async Task<IPage<ImportReport>> Search(IPageable pageable, SearchImportReportDto searchImportReportDto)
        {
            return await ImportReportRepository.Search(pageable, searchImportReportDto);
        }
    }
}