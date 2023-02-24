using Keeper.DataAccess.Entities;
using Keeper.DataAccess.Enums;
using Keeper.DataAccess.Factories;
using Keeper.Server.MapConfigurations;
using Keeper.Server.Services;
using Keeper.Server.Utils;
using Keeper.Tests.Context;
using Mapster;
using MapsterMapper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Keeper.Tests
{
    public class RepositoryActivitiesTests: IDisposable
    {

        private readonly Guid _repositoryId = Guid.Parse("465b2b2f-3b0e-4562-a221-0719efa9c964");

        private readonly IKeeperDbContextFactory _contextFactory;
        private readonly IRepositoryActivitiesService _repositoryActivitiesService;
        private readonly IMapper _mapper;

        public RepositoryActivitiesTests()
        {
            var config = new TypeAdapterConfig();
            var profile = new RepositoryActivityProfile();

            config.Apply(profile);
            _mapper = new Mapper(config);
            _contextFactory = new KeeperDbContextTestsFactory();
            _repositoryActivitiesService = new RepositoryActivitiesService(_contextFactory, _mapper);

            SeedDatabase();
        }

        [Fact]
        public async Task ShouldReturnPage2WhichIncludes2Items()
        {
            var pagination = await _repositoryActivitiesService.GetActivitiesPaginated(_repositoryId, 2, 5);

            Assert.True(pagination.CurrentPage == 2 && pagination.PagesCount == 2 && pagination.PageItemsCount == 2, "Pagination returned unexpected item/page counts.");
        }

        private void SeedDatabase()
        {
            using (var context = _contextFactory.CreateDbContext())
            {
                HashingUtil.HashHmac("123456", out var hash, out var salt);
                var user = new UserEntity
                {
                    Email = "test@test.com",
                    PasswordHash = hash,
                    PasswordSalt = salt,
                    Firstname = "first",
                    Lastname = "last",
                    RegisterIp = "127.0.0.1",
                    LastAccessIp = "127.0.0.1"
                };
                context.Users.Add(user);
                context.SaveChanges();

                var repository = new RepositoryEntity
                {
                    Id = _repositoryId,
                    Name = "Main repo",
                    Description = "Desc",
                    OwnerId = user.Id
                };

                context.Repositories.Add(repository);
                context.SaveChanges();

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
                context.SaveChanges();
            }
        }

        public void Dispose()
        {
            using (var context = _contextFactory.CreateDbContext())
            {
                context.Database.EnsureDeleted();
            }
        }
    }
}