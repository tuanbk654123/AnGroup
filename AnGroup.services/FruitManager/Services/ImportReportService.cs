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
        public async Task<bool> Update(UpdateImportReportDto updateImportReportDto, CancellationToken cancellationToken = default)
        {
            var ImportReport = updateImportReportDto.Adapt<ImportReport>();
            return await ImportReportRepository.UpdateAsync(x => x.Id, ImportReport, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var ImportReport = await ImportReportRepository.GetByIndexAsync(x => x.Id, id);
            if (ImportReport != null)
            {
                return await ImportReportRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }
    }
}