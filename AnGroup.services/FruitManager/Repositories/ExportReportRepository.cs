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
    internal sealed class ExportReportRepository : MongoDbBase<ExportReport>, IExportReportRepository
    {
        public ExportReportRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }
        public async Task<bool> Delete(string id)
        {
            var builder = Builders<ExportReport>.Filter;
            var filter = builder.Empty;
            filter &= builder.Where(x => x.Id == id);

            var resultCount = await Collection.DeleteOneAsync(filter);

            return resultCount.DeletedCount > 0;
        }
        public async Task<IPage<ExportReport>> Search(IPageable pageable, SearchExportReportDto searchExportReportDto)
        {
            var builder = Builders<ExportReport>.Filter;
            var filter = builder.Empty;


            // setting date search
         
            if (searchExportReportDto.fromDate != null)
            {
                DateTime fromDate = new DateTime(searchExportReportDto.fromDate.Value.Year, searchExportReportDto.fromDate.Value.Month, searchExportReportDto.fromDate.Value.Day, 7, 0, 0);
                filter &= Builders<ExportReport>.Filter.Gte(x => x.FromDate, fromDate);
            }
            if (searchExportReportDto.toDate != null)
            {
                DateTime toDate = new DateTime(searchExportReportDto.toDate.Value.Year, searchExportReportDto.toDate.Value.Month, searchExportReportDto.toDate.Value.Day, 23, 0, 0).AddHours(7);
                filter &= Builders<ExportReport>.Filter.Lte(x => x.FromDate, toDate);
            }
            if (searchExportReportDto.statusExport != null)
            {
                filter &= Builders<ExportReport>.Filter.Eq(x => x.statusExport, searchExportReportDto.statusExport);
            }

            var result = await Collection.Find(filter).SortByDescending(e => e.FromDate).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<ExportReport>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }

    }
}