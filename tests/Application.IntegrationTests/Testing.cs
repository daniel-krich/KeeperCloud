using Keeper.Application.Interfaces;
using Keeper.Application.Models;
using Keeper.Domain.Entities;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using Keeper.Utilities;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace Application.IntegrationTests;

[SetUpFixture]
public partial class Testing
{
    private static WebApplicationFactory<Program> _factory = null!;
    public static IServiceScopeFactory ScopeFactory = null!;
    public static IKeeperDbContextFactory DbFactory = null!;
    public static IConfiguration Configuration = null!;
    public static IMapper Mapper = null!;

    [OneTimeSetUp]
    public void RunBeforeAnyTests()
    {
        _factory = new CustomWebApplicationFactory();
        ScopeFactory = _factory.Services.GetRequiredService<IServiceScopeFactory>();
        DbFactory = _factory.Services.GetRequiredService<IKeeperDbContextFactory>();
        Configuration = _factory.Services.GetRequiredService<IConfiguration>();
        Mapper = _factory.Services.GetRequiredService<IMapper>();
    }

    public static async Task<PaginationWrapperModel<RepositoryActivityModel>> GetActivitiesPaginated(Guid userId, Guid repositoryId, int page, int maxItemsPerPage)
    {
        var repositoryActivitiesService = _factory.Services.GetRequiredService<IRepositoryActivitiesService>();
        var pagination = await repositoryActivitiesService.GetActivitiesPaginated(userId, repositoryId, page, maxItemsPerPage);
        return pagination;
    }

    public static async Task SeedRepositoryWithActivities(Guid userId, Guid repositoryId)
    {
        using (var context = DbFactory.CreateDbContext())
        {
            Hashing.HashHmac("123456", out var hash, out var salt);
            var user = new UserEntity
            {
                Id = userId,
                Email = "test@test.com",
                PasswordHash = hash,
                PasswordSalt = salt,
                Firstname = "first",
                Lastname = "last",
                RegisterIp = "127.0.0.1",
                LastAccessIp = "127.0.0.1"
            };
            context.Users.Add(user);
            await context.SaveChangesAsync();

            var repository = new RepositoryEntity
            {
                Id = repositoryId,
                Name = "Main repo",
                Description = "Desc",
                OwnerId = user.Id
            };

            context.Repositories.Add(repository);
            await context.SaveChangesAsync();

            context.RepositoryActivities.AddRange(
                new RepositoryActivityEntity
                {
                    RepositoryId = repository.Id,
                    OperationId = RepositoryActivity.CreateRepository,
                    OperationContext = "Created repository from web app",
                    Identity = user.Email
                },
                new RepositoryActivityEntity
                {
                    RepositoryId = repository.Id,
                    OperationId = RepositoryActivity.UploadFilesToRepository,
                    OperationContext = "Uploaded from web app 15 files",
                    Identity = user.Email
                },
                new RepositoryActivityEntity
                {
                    RepositoryId = repository.Id,
                    OperationId = RepositoryActivity.UploadFilesToRepository,
                    OperationContext = "Uploaded from web app 7 files",
                    Identity = user.Email
                },
                new RepositoryActivityEntity
                {
                    RepositoryId = repository.Id,
                    OperationId = RepositoryActivity.UploadFilesToRepository,
                    OperationContext = "Uploaded from web app 5 files",
                    Identity = user.Email
                },
                new RepositoryActivityEntity
                {
                    RepositoryId = repository.Id,
                    OperationId = RepositoryActivity.DeleteFilesFromRepository,
                    OperationContext = "Deleted files from api member",
                    Identity = "zogov api member"
                },
                new RepositoryActivityEntity
                {
                    RepositoryId = repository.Id,
                    OperationId = RepositoryActivity.ToggleRepositoryAccess,
                    OperationContext = "Set to public repository",
                    Identity = user.Email
                },
                new RepositoryActivityEntity
                {
                    RepositoryId = repository.Id,
                    OperationId = RepositoryActivity.ToggleRepositoryAccess,
                    OperationContext = "Set to private repository",
                    Identity = user.Email
                }
            );
            await context.SaveChangesAsync();
        }
    }

    [OneTimeTearDown]
    public void RunAfterAnyTests()
    {
    }
}
