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

    internal sealed class ImportPriceService : IImportPriceService
    {
        private readonly IImportPriceRepository ImportPriceRepository;


        public ImportPriceService(IImportPriceRepository  ImportPriceRepository)
        {
            this.ImportPriceRepository = ImportPriceRepository;

        }

        public async Task<bool> Create(CreateImportPriceDto createImportPriceDto, CancellationToken cancellationToken = default)
        {

            ImportPrice? ImportPrice = new ImportPrice();
            ImportPrice = createImportPriceDto?.Adapt<ImportPrice>();
            ImportPrice.Id = Guid.NewGuid().ToString();
            ImportPrice.DateImport = ImportPrice.DateImport.AddHours(7);
            var result = await ImportPriceRepository.UpdateAsync(x => x.Id, ImportPrice, true);
            return result;
        }

        public async Task<IPage<ImportPrice>> Search(IPageable pageable, SearchImportPriceDto searchImportPriceDto)
        {
            return await ImportPriceRepository.Search(pageable, searchImportPriceDto);
        }
        public async Task<bool> Update(UpdateImportPriceDto updateImportPriceDto, CancellationToken cancellationToken = default)
        {
            var ImportPrice = updateImportPriceDto.Adapt<ImportPrice>();
            ImportPrice.DateImport = ImportPrice.DateImport.AddHours(7);
            return await ImportPriceRepository.UpdateAsync(x => x.Id, ImportPrice, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var ImportPrice = await ImportPriceRepository.GetByIndexAsync(x => x.Id, id);
            if (ImportPrice != null)
            {
                return await ImportPriceRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }
    }
}