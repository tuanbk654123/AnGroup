using DataAccess.Models;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;
using DataAccess.Pagination.Base;

namespace FruitManager.Services.Interfaces
{
    public interface IImportProcessService
    {

        Task<IPage<ImportProcess>> Search(IPageable pageable, SearchImportProcessDto searchImportProcessDto);
        Task<byte[]> ExportBill(string id);
        Task<bool> Create(CreateImportProcessDto createImportProcessDto,  CancellationToken cancellationToken = default);
        Task<bool> Update(UpdateImportProcessDto updateImportProcessDto, CancellationToken cancellationToken = default);
        Task<bool> Delete(string id, CancellationToken cancellationToken = default);
    }
}