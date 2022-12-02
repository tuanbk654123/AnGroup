using AspNetCore.Identity.MongoDbCore.Infrastructure;
using DataAccess.Models;
using DataAccess.MongoDbHelper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Logging;
using MongoDB.Driver;
using FruitManager.Extensions;
using FruitManager.Repositories;
using FruitManager.Repositories.Interfaces;
using FruitManager.Services;
using FruitManager.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);
//// ConfigureCors
ServiceExtensions.ConfigureCors(builder.Services);


// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

// config mongodb 
ServiceExtensions.ConfigureMongoDB(builder.Services, builder.Configuration);
// inject service  
ServiceExtensions.ConfigureServices(builder.Services, builder.Configuration);
// config swagger 
ServiceExtensions.ConfigureSwagger(builder.Services);



IdentityModelEventSource.ShowPII = true; //Add this line

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


//app.UseHttpsRedirection();
app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
