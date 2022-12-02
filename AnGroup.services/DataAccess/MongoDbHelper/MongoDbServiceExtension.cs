using AspNetCore.Identity.MongoDbCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text;

namespace DataAccess.MongoDbHelper
{
    public static class MongoDbServiceExtension
    {
        public static void AddMongoDb(this IServiceCollection services, IConfiguration configuration)
        {
            var mongoConnectionString = "mongodb://" + configuration.GetValue<string>("MongoDB:ConnectionString", "localhost:27017");
            var database = configuration.GetValue<string>("MongoDB:DatabaseName", "localDb");
            //var mongoConnectionString = "mongodb://localhost:27017";
            //var database = "Identity";

            Console.WriteLine($"Init MongoDB, connection string: {mongoConnectionString}, database name: {database}");
            try
            {
                var clientCheck = new MongoClient(mongoConnectionString);
                var database1 = clientCheck.GetDatabase("database");
                database1.RunCommandAsync((Command<BsonDocument>)"{ping:1}").Wait();
                services.AddSingleton<IMongoClient>(sp =>
                {
                    return new MongoClient(mongoConnectionString);
                });

                services.AddSingleton(sp =>
                {
                    var client = sp.GetRequiredService<IMongoClient>();
                    return client.GetDatabase(database);
                });
            
                var conventionPack = new ConventionPack { new IgnoreExtraElementsConvention(true) };
                ConventionRegistry.Register("IgnoreExtraElements", conventionPack, type => true);

                if (MongoDB.Bson.Serialization.BsonSerializer.LookupSerializer<DateTimeOffset>() == null)
                    MongoDB.Bson.Serialization.BsonSerializer.RegisterSerializer(MongoDB.Bson.Serialization.Serializers.DateTimeSerializer.LocalInstance);

            } catch (Exception ex)
            {
                Console.WriteLine("MongoDbServiceExtension : " + ex);
                //Serilog.Log.Fatal(ex, $"Can not connect MongoDb with connection string: {mongoConnectionString}, database name: {database}");
            }

        }
    }
}
