using FluentAssertions;
using Keeper.RepositoriesAccess;
using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace RepositoriesAccess.UnitTests;

public class Testing
{
    private IRepositoriesAccessor _repositoriesAccessor = null!;

    private Guid _userId = Guid.Parse("29b21dcf-a76f-4e44-a47e-f3fefcdb2cae");

    [OneTimeSetUp]
    public void Setup()
    {
        _repositoriesAccessor = new RepositoriesAccessor(opt => opt.FolderName = "testFiles");
    }

    [Test]
    public async Task CreateRepoWithANewFileAndReadFromItThenEnsureDelete()
    {
        var repo = _repositoriesAccessor.CreateRepository(_userId);
        var file = repo!.CreateRepoFileAccessor();
        using Aes aes = Aes.Create();
        using (Stream repoFileStream = await file.OpenWriteStreamAsync(aes.Key, aes.IV, true))
        {
            await repoFileStream.WriteAsync(Encoding.ASCII.GetBytes("Hello world"));
        }

        using (Stream repoFileStream = await file.OpenReadStreamAsync(aes.Key, aes.IV, true))
        {
            StreamReader sr = new StreamReader(repoFileStream);
            (await sr.ReadToEndAsync()).Should().Be("Hello world");
        }

        await file.DeleteAsync();


        await file.Invoking(x => x.OpenReadStreamAsync()).Should().ThrowAsync<FileNotFoundException>();

        await repo.DeleteRepository();
    }
}