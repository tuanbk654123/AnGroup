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
    using DataAccess.Models.Dto.ExportPrice;
    using DataAccess.ExceptionFilter.Exceptions;

    internal sealed class ExportPriceService : IExportPriceService
    {
        private readonly IExportPriceRepository ExportPriceRepository;


        public ExportPriceService(IExportPriceRepository  ExportPriceRepository)
        {
            this.ExportPriceRepository = ExportPriceRepository;

        }

        public async Task<bool> Create(CreateExportPriceDto createExportPriceDto, CancellationToken cancellationToken = default)
        {

            ExportPrice? ExportPrice = new ExportPrice();
            ExportPrice = createExportPriceDto?.Adapt<ExportPrice>();
            ExportPrice.Id = Guid.NewGuid().ToString();
            ExportPrice.DateExport = ExportPrice.DateExport ;
            var result = await ExportPriceRepository.UpdateAsync(x => x.Id, ExportPrice, true);
            return result;
        }

        public async Task<IPage<ExportPrice>> Search(IPageable pageable, SearchExportPriceDto searchExportPriceDto)
        {
            return await ExportPriceRepository.Search(pageable, searchExportPriceDto);
        }
        public async Task<bool> Update(UpdateExportPriceDto updateExportPriceDto, CancellationToken cancellationToken = default)
        {
            var ExportPrice = updateExportPriceDto.Adapt<ExportPrice>();
            return await ExportPriceRepository.UpdateAsync(x => x.Id, ExportPrice, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var ExportPrice = await ExportPriceRepository.GetByIndexAsync(x => x.Id, id);
            if (ExportPrice != null)
            {
                return await ExportPriceRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }
    }
}