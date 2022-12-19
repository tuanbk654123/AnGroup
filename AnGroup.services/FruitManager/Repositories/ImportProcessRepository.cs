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
    internal sealed class ImportProcessRepository : MongoDbBase<ImportProcess>, IImportProcessRepository
    {
        public ImportProcessRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }
        public async Task<bool> Delete(string id)
        {
            var builder = Builders<ImportProcess>.Filter;
            var filter = builder.Empty;
            filter &= builder.Where(x => x.Id == id);

            var resultCount = await Collection.DeleteOneAsync(filter);

            return resultCount.DeletedCount > 0;
        }
        public async Task<IPage<ImportProcess>> Search(IPageable pageable, SearchImportProcessDto searchImportProcessDto)
        {
            var builder = Builders<ImportProcess>.Filter;
            var filter = builder.Empty;

            // setting date search
         
            if (searchImportProcessDto.fromDate != null)
            {
                DateTime fromDate = new DateTime(searchImportProcessDto.fromDate.Value.Year, searchImportProcessDto.fromDate.Value.Month, searchImportProcessDto.fromDate.Value.Day, 7, 0, 0);
                filter &= Builders<ImportProcess>.Filter.Gte(x => x.DateImport, fromDate);
            }
            if (searchImportProcessDto.toDate != null)
            {
                DateTime toDate = new DateTime(searchImportProcessDto.toDate.Value.Year, searchImportProcessDto.toDate.Value.Month, searchImportProcessDto.toDate.Value.Day, 23, 0, 0).AddHours(8);
                filter &= Builders<ImportProcess>.Filter.Lte(x => x.DateImport, toDate);
            }

            var result = await Collection.Find(filter).SortByDescending(e => e.DateImport).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<ImportProcess>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }

    }
}