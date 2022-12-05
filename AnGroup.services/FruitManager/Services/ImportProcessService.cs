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

    internal sealed class ImportProcessService : IImportProcessService
    {
        private readonly IImportProcessRepository ImportProcessRepository;


        public ImportProcessService(IImportProcessRepository  ImportProcessRepository)
        {
            this.ImportProcessRepository = ImportProcessRepository;

        }

        public async Task<bool> Create(CreateImportProcessDto createImportProcessDto, CancellationToken cancellationToken = default)
        {

            ImportProcess? ImportProcess = new ImportProcess();
            ImportProcess = createImportProcessDto?.Adapt<ImportProcess>();
            ImportProcess.Id = Guid.NewGuid().ToString();
            var result = await ImportProcessRepository.UpdateAsync(x => x.Id, ImportProcess, true);
            return result;
        }

        public async Task<IPage<ImportProcess>> Search(IPageable pageable, SearchImportProcessDto searchImportProcessDto)
        {
            return await ImportProcessRepository.Search(pageable, searchImportProcessDto);
        }
        public async Task<bool> Update(UpdateImportProcessDto updateImportProcessDto, CancellationToken cancellationToken = default)
        {
            var ImportProcess = updateImportProcessDto.Adapt<ImportProcess>();
            return await ImportProcessRepository.UpdateAsync(x => x.Id, ImportProcess, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var ImportProcess = await ImportProcessRepository.GetByIndexAsync(x => x.Id, id);
            if (ImportProcess != null)
            {
                return await ImportProcessRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }
    }
}