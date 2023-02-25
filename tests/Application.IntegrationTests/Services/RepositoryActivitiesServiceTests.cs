using FluentAssertions;
using NUnit.Framework;
using System;
using System.Threading.Tasks;

namespace Application.IntegrationTests.Services;

using static Testing;

[TestFixture]
public class RepositoryActivitiesServiceTests
{
    private readonly Guid _repositoryId = Guid.Parse("465b2b2f-3b0e-4562-a221-0719efa9c964");
    private readonly Guid _userId = Guid.Parse("465b2b2f-3b0e-4562-a221-0719efa9c965");

    [OneTimeSetUp]
    public async Task Setup()
    {
        await SeedRepositoryWithActivities(_userId, _repositoryId);
    }

    [Test]
    [TestCase(1, 3)]
    [TestCase(1, 10)]
    [TestCase(2, 5)]
    [TestCase(5, 10)]
    [TestCase(3, 3)]
    [TestCase(3, 5)]
    [TestCase(1, 7)]
    [Parallelizable(ParallelScope.All)]
    public async Task ShouldReturnPaginationActivityItems(int page, int maxItems, int totalItemsInDb = 7)
    {
        var pagination = await GetActivitiesPaginated(_repositoryId, page, maxItems);

        pagination.CurrentPage.Should().Be(page);

        int expectedPagesCount = (totalItemsInDb / maxItems) + 1;
        pagination.PagesCount.Should().Be(expectedPagesCount);

        int expectedPageItemsCount = 0;
        if (page <= expectedPagesCount)
        {
            int itemsOnLastPage = totalItemsInDb % maxItems;
            if (itemsOnLastPage == 0 && totalItemsInDb > 0)
            {
                itemsOnLastPage = maxItems;
            }

            if (page < expectedPagesCount)
            {
                expectedPageItemsCount = maxItems;
            }
            else
            {
                expectedPageItemsCount = itemsOnLastPage;
            }
        }

        pagination.PageItemsCount.Should().Be(expectedPageItemsCount);
    }

    [OneTimeTearDown]
    public async Task Teardown()
    {
        using (var context = DbFactory.CreateDbContext())
        {
            var repo = await context.Repositories.FindAsync(_repositoryId);
            var user = await context.Users.FindAsync(_userId);
            context.Users.Remove(user!);
            context.Repositories.Remove(repo!);
            await context.SaveChangesAsync();
        }
    }

}