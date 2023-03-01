using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.Common.Security;
using Keeper.Application.Common.Security.Attributes;
using Keeper.Application.RepositoryFiles.Exceptions;
using Keeper.Domain.Entities;
using Keeper.Domain.Enums;
using Keeper.Domain.Models;
using Keeper.RepositoriesAccess.Enums;
using Keeper.RepositoriesAccess.Interfaces;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryFiles.Queries.GetRepositoryFileStream;

public record GetRepositoryFileStreamQuery : IRequest<RepositoryFileWithStream>
{
    public Guid RepositoryId { get; set; }
    public Guid FileId { get; set; }
}

public class GetRepositoryFileStreamQueryHandler : IRequestHandler<GetRepositoryFileStreamQuery, RepositoryFileWithStream>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IRepositoriesAccessor _repositoriesAccessor;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;
    public GetRepositoryFileStreamQueryHandler(IKeeperDbContextFactory keeperFactory, IRepositoriesAccessor repositoriesAccessor, IAuthenticatedUserService authenticatedUserService, IMapper mapper)
    {
        _keeperFactory = keeperFactory;
        _repositoriesAccessor = repositoriesAccessor;
        _authenticatedUserService = authenticatedUserService;
        _mapper = mapper;
    }

    public async Task<RepositoryFileWithStream> Handle(GetRepositoryFileStreamQuery request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User;
            var fileEntity = await context.Files.Include(x => x.Repository).Where(FindFileByUser(user)).FirstOrDefaultAsync(x => x.Id == request.FileId && x.Repository.Id == request.RepositoryId);
            if (fileEntity != null)
            {
                var repo = _repositoriesAccessor.OpenRepository(fileEntity.Repository.OwnerId, request.RepositoryId);
                var file = repo?.OpenRepoFileAccessor(fileEntity.Id);
                if (repo != null && file != null)
                {
                    Stream fileStream = await file.OpenStreamAsync(options =>
                    {
                        options.Mode = RepositoryFileStreamMode.Read;
                        options.Key = fileEntity.EncKey;
                        options.IV = fileEntity.EncIV;
                        options.Encryption = true;
                        options.Compression = true;
                    }, default);
                    return new RepositoryFileWithStream(_mapper.Map<FileModel>(fileEntity), fileStream);
                }
            }
            throw new RepositoryFileNotFoundException();
        }
    }

    private Expression<Func<FileEntity, bool>> FindFileByUser(UserCredentials? user)
    {
        if (user?.UserType == UserCredentialsType.DefaultUser) return (file) => file.Repository.OwnerId == user.Id;
        else if (user?.UserType == UserCredentialsType.RepositoryMember) return (file) => file.Repository.ApiMembers.Any(x => x.Id == user.Id && x.PermissionFlags.HasFlag(RepositoryPermissionFlags.CanRead));
        else return (file) => file.Repository.AllowAnonymousFileRead;
    }
}