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
    internal sealed class ExportProcessRepository : MongoDbBase<ExportProcess>, IExportProcessRepository
    {
        public ExportProcessRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }
        public async Task<bool> Delete(string id)
        {
            var builder = Builders<ExportProcess>.Filter;
            var filter = builder.Empty;
            filter &= builder.Where(x => x.Id == id);

            var resultCount = await Collection.DeleteOneAsync(filter);

            return resultCount.DeletedCount > 0;
        }
        public async Task<IPage<ExportProcess>> Search(IPageable pageable, SearchExportProcessDto searchExportProcessDto)
        {
            var builder = Builders<ExportProcess>.Filter;
            var filter = builder.Empty;

            // setting date search
         
            if (searchExportProcessDto.fromDate != null)
            {
                DateTime fromDate = new DateTime(searchExportProcessDto.fromDate.Value.Year, searchExportProcessDto.fromDate.Value.Month, searchExportProcessDto.fromDate.Value.Day, 7, 0, 0);
                filter &= Builders<ExportProcess>.Filter.Gte(x => x.DateExport, fromDate);
            }
            if (searchExportProcessDto.toDate != null)
            {
                DateTime toDate = new DateTime(searchExportProcessDto.toDate.Value.Year, searchExportProcessDto.toDate.Value.Month, searchExportProcessDto.toDate.Value.Day, 23, 0, 0).AddHours(8);
                filter &= Builders<ExportProcess>.Filter.Lte(x => x.DateExport, toDate);
            }

            var result = await Collection.Find(filter).SortByDescending(e => e.DateExport).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<ExportProcess>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }

    }
}