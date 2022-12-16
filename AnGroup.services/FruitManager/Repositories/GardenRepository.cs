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
    internal sealed class GardenRepository : MongoDbBase<Garden>, IGardenRepository
    {
        public GardenRepository(IConfiguration configuration, IMongoDatabase mongoDatabase) : base(configuration, mongoDatabase)
        {
        }
        public async Task<bool> Delete(string id)
        {
            var builder = Builders<Garden>.Filter;
            var filter = builder.Empty;
            filter &= builder.Where(x => x.Id == id);

            var resultCount = await Collection.DeleteOneAsync(filter);

            return resultCount.DeletedCount > 0;
        }
        public async Task<IPage<Garden>> Search(IPageable pageable, SearchGardenDto searchGardenDto)
        {
            var builder = Builders<Garden>.Filter;
            var filter = builder.Empty;

            if (!string.IsNullOrEmpty(searchGardenDto.PhoneNumber))
            {
                filter &= builder.Where(x => x.PhoneNumber.Contains(searchGardenDto.PhoneNumber));
            }
            if (!string.IsNullOrEmpty(searchGardenDto.NameGarden))
            {
                filter &= builder.Where(x => x.NameGarden.Contains(searchGardenDto.NameGarden));
            }
            if (!string.IsNullOrEmpty(searchGardenDto.Name))
            {
                filter &= builder.Where(x => x.Name.Contains(searchGardenDto.Name));
            }

            var result = await Collection.Find(filter).SortByDescending(e => e.DateCreate).Skip((pageable.PageNumber - 1) * pageable.PageSize).Limit(pageable.PageSize).ToListAsync();
            var resultCount = await Collection.Find(filter).CountDocumentsAsync();
            var page = new Page<Garden>
            {
                PageIndex = pageable == null ? 0 : pageable.PageNumber,
                TotalItem = resultCount,
                Content = result
            };
            return page;
        }

    }
}