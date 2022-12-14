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
using DataAccess.Models.Dto.ExportPrice;

namespace FruitManager.Repositories
{
    internal sealed class ExportPriceRepository : MongoDbBase<ExportPrice>, IExportPriceRepository
    {
        public ExportPriceRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }
        public async Task<bool> Delete(string id)
        {
            var builder = Builders<ExportPrice>.Filter;
            var filter = builder.Empty;
            filter &= builder.Where(x => x.Id == id);

            var resultCount = await Collection.DeleteOneAsync(filter);

            return resultCount.DeletedCount > 0;
        }
        public async Task<IPage<ExportPrice>> Search(IPageable pageable, SearchExportPriceDto searchExportPriceDto)
        {
            var builder = Builders<ExportPrice>.Filter;
            var filter = builder.Empty;

        
            // setting date search
         
            if (searchExportPriceDto.fromDate != null)
            {
                DateTime fromDate = new DateTime(searchExportPriceDto.fromDate.Value.Year, searchExportPriceDto.fromDate.Value.Month, searchExportPriceDto.fromDate.Value.Day, 7, 0, 0);
                filter &= Builders<ExportPrice>.Filter.Gte(x => x.DateExport, fromDate);
            }
            if (searchExportPriceDto.toDate != null)
            {
                DateTime toDate = new DateTime(searchExportPriceDto.toDate.Value.Year, searchExportPriceDto.toDate.Value.Month, searchExportPriceDto.toDate.Value.Day, 23, 0, 0).AddHours(7);
                filter &= Builders<ExportPrice>.Filter.Lte(x => x.DateExport, toDate);
            }

            var result = await Collection.Find(filter).SortByDescending(e => e.DateExport).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<ExportPrice>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }

    }
}