using Keeper.Application.Common.Exceptions;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
using Keeper.Application.Common.Security.Attributes;
using MediatR;
using System.Reflection;

namespace Keeper.Application.Common.Behaviours;

public class AuthorizationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    private readonly IAuthenticatedUserService _authenticatedUserService;

    public AuthorizationBehaviour(IAuthenticatedUserService authenticatedUserService)
    {
        _authenticatedUserService = authenticatedUserService;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var authorizeAttributes = request.GetType().GetCustomAttributes<AuthorizedRequestAttribute>();

        if (authorizeAttributes.Any())
        {
            if (!_authenticatedUserService.IsAuthenticated || _authenticatedUserService.User == null)
            {
                throw new ForbiddenAccessException();
            }

            if (!authorizeAttributes.Any(x => x is AuthorizedRepositoryMemberRequestAttribute && _authenticatedUserService.User?.UserType == UserCredentialsType.RepositoryMember ||
                                              x is AuthorizedUserRequestAttribute && _authenticatedUserService.User?.UserType == UserCredentialsType.DefaultUser))
            {
                throw new AccessSchemaMismatchException();
            }
        }

        return await next();
    }
}