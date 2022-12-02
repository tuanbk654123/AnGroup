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

    internal sealed class BillService : IBillService
    {
        private readonly IBillRepository billRepository;


        public BillService(IBillRepository  billRepository)
        {
            this.billRepository = billRepository;

        }

        public async Task<bool> Create(CreateBillDto createBillDto, CancellationToken cancellationToken = default)
        {

            Bill? bill = new Bill();
            bill = createBillDto?.Adapt<Bill>();
            bill.Id = Guid.NewGuid().ToString();
            var result = await billRepository.UpdateAsync(x => x.Id, bill, true);
            return result;
        }

        public async Task<IPage<Bill>> Search(IPageable pageable, SearchBillDto searchBillDto)
        {
            return await billRepository.Search(pageable, searchBillDto);
        }
    }
}