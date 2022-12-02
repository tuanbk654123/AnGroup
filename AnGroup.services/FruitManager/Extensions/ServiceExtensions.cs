using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AspNetCore.Identity.MongoDbCore.Infrastructure;
using DataAccess.Models;
using DataAccess.MongoDbHelper;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.OpenApi.Models;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using FruitManager.Repositories;
using FruitManager.Repositories.Interfaces;
using FruitManager.Services;
using FruitManager.Services.Interfaces;

namespace FruitManager.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
            });
        }

        public static void ConfigureSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "User Manager Server", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = @"JWT Authorization header using the Bearer scheme.
                      Enter 'Bearer' [space] and then your token in the text input below.
                      Example: 'Bearer 12345abcdef'",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });
            });
        }

        public static void ConfigureMongoDB(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddMongoDb(configuration);

        }

        public static void ConfigureServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddTransient<IUserLoginService, UserLoginService>();
            services.AddTransient<IUserLoginRepository, UserLoginRepository>();
            services.AddTransient<IBillService, BillService>();
            services.AddTransient<IBillRepository, BillRepository>();
            services.AddTransient<IExportPriceService, ExportPriceService>();
            services.AddTransient<IExportPriceRepository, ExportPriceRepository>();
            services.AddTransient<IExportProcessService, ExportProcessService>();
            services.AddTransient<IExportProcessRepository, ExportProcessRepository>();
            services.AddTransient<IExportReportService, ExportReportService>();
            services.AddTransient<IExportReportRepository, ExportReportRepository>();
            services.AddTransient<IGardenService, GardenService>();
            services.AddTransient<IGardenRepository, GardenRepository>();
            services.AddTransient<IImportPriceService, ImportPriceService>();
            services.AddTransient<IImportPriceRepository, ImportPriceRepository>();
            services.AddTransient<IImportProcessService, ImportProcessService>();
            services.AddTransient<IImportProcessRepository, ImportProcessRepository>();
            services.AddTransient<IImportReportService, ImportReportService>();
            services.AddTransient<IImportReportRepository, ImportReportRepository>();

        }

        public static void ConfigureIdentity(this IServiceCollection services, IConfiguration configuration)
        {
            var ISsoApecGroupService = configuration.GetValue<string>("ISsoApecGroupService:BaseUrl", "https://localhost:5001");
            // Add services to the container.
            services.AddAuthentication("Bearer")
                .AddIdentityServerAuthentication("Bearer", options =>
                {
                    options.Authority = ISsoApecGroupService;
                    options.ApiName = "ApiSsoManager";
                    options.RequireHttpsMetadata = false;
                });

        }
       
    }
}