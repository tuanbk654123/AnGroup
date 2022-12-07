using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.Pagination.Base;

namespace FruitManager.Services.Interfaces
{
    public interface IGardenService
    {

        Task<IPage<Garden>> Search(IPageable pageable, SearchGardenDto searchGardenDto );
        Task<Garden> GetByGardenName(string gardenName, CancellationToken cancellationToken = default);
        Task<bool> Create(CreateGardenDto  createGardenDto  ,  CancellationToken cancellationToken = default);
        Task<bool> Update(UpdateGardenDto updateGardenDto, CancellationToken cancellationToken = default);
        Task<bool> Delete(string id, CancellationToken cancellationToken = default);
    }
}