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
    internal sealed class ImportPriceRepository : MongoDbBase<ImportPrice>, IImportPriceRepository
    {
        public ImportPriceRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }
        public async Task<bool> Delete(string id)
        {
            var builder = Builders<ImportPrice>.Filter;
            var filter = builder.Empty;
            filter &= builder.Where(x => x.Id == id);

            var resultCount = await Collection.DeleteOneAsync(filter);

            return resultCount.DeletedCount > 0;
        }
        public async Task<IPage<ImportPrice>> Search(IPageable pageable, SearchImportPriceDto searchImportPriceDto)
        {
            var builder = Builders<ImportPrice>.Filter;
            var filter = builder.Empty;

            // setting date search
         
            if (searchImportPriceDto.fromDate != null)
            {
                DateTime fromDate = new DateTime(searchImportPriceDto.fromDate.Value.Year, searchImportPriceDto.fromDate.Value.Month, searchImportPriceDto.fromDate.Value.Day, 7, 0, 0);
                filter &= Builders<ImportPrice>.Filter.Gte(x => x.DateImport, fromDate);
            }
            if (searchImportPriceDto.toDate != null)
            {
                DateTime toDate = new DateTime(searchImportPriceDto.toDate.Value.Year, searchImportPriceDto.toDate.Value.Month, searchImportPriceDto.toDate.Value.Day, 23, 0, 0).AddHours(7);
                filter &= Builders<ImportPrice>.Filter.Lte(x => x.DateImport, toDate);
            }

            var result = await Collection.Find(filter).SortByDescending(e => e.DateImport).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<ImportPrice>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }

    }
}