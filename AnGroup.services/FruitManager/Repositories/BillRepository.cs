using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using DataAccess.Models;
using DataAccess.MongoDbHelper;

using FruitManager.Repositories.Interfaces;
using MongoDB.Driver;
using DataAccess.Pagination.Base;
using DataAccess.Models.Dto;
using DataAccess.Models.Dto.ExportProcess;

namespace FruitManager.Repositories
{
    internal sealed class BillRepository : MongoDbBase<Bill>, IBillRepository
    {
        public BillRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }

        public async Task<IPage<Bill>> Search(IPageable pageable, SearchBillDto searchBillDto)
        {
            var builder = Builders<Bill>.Filter;
            var filter = builder.Empty;

            // setting date search
         
            if (searchBillDto.fromDate != null)
            {
                DateTime fromDate = new DateTime(searchBillDto.fromDate.Value.Year, searchBillDto.fromDate.Value.Month, searchBillDto.fromDate.Value.Day, 0, 0, 0);
                filter &= Builders<Bill>.Filter.Gte(x => x.Date, fromDate);
            }
            if (searchBillDto.toDate != null)
            {
                DateTime toDate = new DateTime(searchBillDto.toDate.Value.Year, searchBillDto.toDate.Value.Month, searchBillDto.toDate.Value.Day, 23, 59, 59);
                filter &= Builders<Bill>.Filter.Lt(x => x.Date, toDate);
            }

            var result = await Collection.Find(filter).SortByDescending(e => e.Date).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<Bill>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }

    }
}