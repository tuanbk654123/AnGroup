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
    }
}