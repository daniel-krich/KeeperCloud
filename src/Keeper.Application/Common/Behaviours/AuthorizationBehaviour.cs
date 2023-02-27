using Keeper.Application.Common.Exceptions;
using Keeper.Application.Common.Interfaces;
using Keeper.Application.Common.Security;
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

        if (authorizeAttributes.Any() && (!_authenticatedUserService.IsAuthenticated || _authenticatedUserService.User == null))
        {
            throw new ForbiddenAccessException();
        }
        return await next();
    }
}