using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Models;
using Keeper.Application.Common.Security;
using Keeper.Domain.Entities;
using Keeper.Domain.Models;
using MapsterMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.RepositoryFiles.Queries.GetRepositoryFilesBatched;

[AuthorizedRequest]
public record GetRepositoryFilesBatchedQuery : IRequest<BatchWrapperModel<FileModel>>
{
    public Guid RepositoryId { get; set; }
    public int Offset { get; set; }
    public int Take { get; set; } = 200;
}

public class GetRepositoryFilesBatchedQueryHandler : IRequestHandler<GetRepositoryFilesBatchedQuery, BatchWrapperModel<FileModel>>
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly IAuthenticatedUserService _authenticatedUserService;
    private readonly IMapper _mapper;
    public GetRepositoryFilesBatchedQueryHandler(IKeeperDbContextFactory keeperFactory, IMapper mapper, IAuthenticatedUserService authenticatedUserService)
    {
        _keeperFactory = keeperFactory;
        _mapper = mapper;
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<BatchWrapperModel<FileModel>> Handle(GetRepositoryFilesBatchedQuery request, CancellationToken cancellationToken)
    {
        using (var context = _keeperFactory.CreateDbContext())
        {
            var user = _authenticatedUserService.User!;
            var repository = await context.Repositories.Include(x =>
                                    x.Files.OrderByDescending(x => x.CreatedDate)
                                    .Skip(request.Offset)
                                    .Take(request.Take)
                            ).FirstOrDefaultAsync(x => x.OwnerId == user.Id && x.Id == request.RepositoryId);
            if (repository != null)
            {
                var howMuchFilesLeftCount = (await context.Files.Where(x => x.RepositoryId == request.RepositoryId).CountAsync()) - request.Offset - repository.Files.Count;
                var fileModelList = _mapper.Map<ICollection<FileEntity>, List<FileModel>>(repository.Files);
                return new BatchWrapperModel<FileModel>(fileModelList, request.Offset, howMuchFilesLeftCount);
            }
            return new BatchWrapperModel<FileModel>();
        }
    }
}