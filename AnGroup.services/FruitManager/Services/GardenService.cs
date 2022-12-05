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

    internal sealed class GardenService : IGardenService
    {
        private readonly IGardenRepository GardenRepository;


        public GardenService(IGardenRepository  GardenRepository)
        {
            this.GardenRepository = GardenRepository;

        }

        public async Task<bool> Create(CreateGardenDto createGardenDto, CancellationToken cancellationToken = default)
        {

            Garden? Garden = new Garden();
            Garden = createGardenDto?.Adapt<Garden>();
            Garden.Id = Guid.NewGuid().ToString();
            var result = await GardenRepository.UpdateAsync(x => x.Id, Garden, true);
            return result;
        }

        public async Task<IPage<Garden>> Search(IPageable pageable, SearchGardenDto searchGardenDto)
        {
            return await GardenRepository.Search(pageable, searchGardenDto);
        }
        public async Task<bool> Update(UpdateGardenDto updateGardenDto, CancellationToken cancellationToken = default)
        {
            var Garden = updateGardenDto.Adapt<Garden>();
            return await GardenRepository.UpdateAsync(x => x.Id, Garden, false, cancellationToken);
        }

        public async Task<bool> Delete(string id, CancellationToken cancellationToken = default)
        {
            var Garden = await GardenRepository.GetByIndexAsync(x => x.Id, id);
            if (Garden != null)
            {
                return await GardenRepository.Delete(id);
            }
            throw new NotFoundException("Không tồn tại hóa đơn");
        }
    }
}