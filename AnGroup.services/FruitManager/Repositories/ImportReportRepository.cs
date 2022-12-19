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
    internal sealed class ImportReportRepository : MongoDbBase<ImportReport>, IImportReportRepository
    {
        public ImportReportRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }
        public async Task<bool> Delete(string id)
        {
            var builder = Builders<ImportReport>.Filter;
            var filter = builder.Empty;
            filter &= builder.Where(x => x.Id == id);

            var resultCount = await Collection.DeleteOneAsync(filter);

            return resultCount.DeletedCount > 0;
        }
        public async Task<IPage<ImportReport>> Search(IPageable pageable, SearchImportReportDto searchImportReportDto)
        {
            var builder = Builders<ImportReport>.Filter;
            var filter = builder.Empty;

           
            // setting date search
         
            if (searchImportReportDto.fromDate != null)
            {
                DateTime fromDate = new DateTime(searchImportReportDto.fromDate.Value.Year, searchImportReportDto.fromDate.Value.Month, searchImportReportDto.fromDate.Value.Day, 7, 0, 0);
                filter &= Builders<ImportReport>.Filter.Gte(x => x.DateImport, fromDate);
            }
            if (searchImportReportDto.toDate != null)
            {
                DateTime toDate = new DateTime(searchImportReportDto.toDate.Value.Year, searchImportReportDto.toDate.Value.Month, searchImportReportDto.toDate.Value.Day, 23, 0, 0).AddHours(8);
                filter &= Builders<ImportReport>.Filter.Lte(x => x.DateImport, toDate);
            }

            var result = await Collection.Find(filter).SortByDescending(e => e.DateImport).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<ImportReport>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }

    }
}