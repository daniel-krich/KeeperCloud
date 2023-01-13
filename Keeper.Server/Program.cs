using Keeper.DataAccess.Context;
using Keeper.DataAccess.Extensions;
using Keeper.RepositoriesMaster.Extensions;
using Keeper.Server.JwtSecurity;
using Keeper.Server.Services;
using Mapster;
using MapsterMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.UseKeeperDbContextFactory();

builder.Services.AddSingleton<IJwtService, JwtService>();
builder.Services.AddSingleton<IAuthService, AuthService>();
builder.Services.AddSingleton<IRepositoryService, RepositoryService>();

builder.Services.AddRepositoriesMaster();


builder.Services.AddSingleton<IMapper, Mapper>((provider) =>
{
    var typeAdapterConfig = TypeAdapterConfig.GlobalSettings;
    typeAdapterConfig.Scan(Assembly.GetExecutingAssembly());
    return new Mapper(typeAdapterConfig);
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAllOrigins",
                      builder =>
                      {
                          builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
                            .AllowAnyHeader()
                            .AllowAnyMethod()
                            .AllowCredentials();
                          //.WithMethods("OPTIONS", "GET");
                      });
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{

    options.RequireHttpsMetadata = true;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
        ValidAudience = builder.Configuration["JwtSettings:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]))
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseCors("AllowAllOrigins");

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();