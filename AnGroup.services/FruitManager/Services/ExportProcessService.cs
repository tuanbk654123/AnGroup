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

    internal sealed class ExportProcessService : IExportProcessService
    {
        private readonly IExportProcessRepository ExportProcessRepository;


        public ExportProcessService(IExportProcessRepository  ExportProcessRepository)
        {
            this.ExportProcessRepository = ExportProcessRepository;

        }

        public async Task<bool> Create(CreateExportProcessDto createExportProcessDto, CancellationToken cancellationToken = default)
        {

            ExportProcess? ExportProcess = new ExportProcess();
            ExportProcess = createExportProcessDto?.Adapt<ExportProcess>();
            ExportProcess.Id = Guid.NewGuid().ToString();
            var result = await ExportProcessRepository.UpdateAsync(x => x.Id, ExportProcess, true);
            return result;
        }

        public async Task<IPage<ExportProcess>> Search(IPageable pageable, SearchExportProcessDto searchExportProcessDto)
        {
            return await ExportProcessRepository.Search(pageable, searchExportProcessDto);
        }
        public async Task<bool> Update(UpdateExportProcessDto updateExportProcessDto, CancellationToken cancellationToken = default)
        {
            var ExportProcess = updateExportProcessDto.Adapt<ExportProcess>();
            return await ExportProcessRepository.UpdateAsync(x => x.Id, ExportProcess, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var ExportProcess = await ExportProcessRepository.GetByIndexAsync(x => x.Id, id);
            if (ExportProcess != null)
            {
                return await ExportProcessRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }
    }
}