using Keeper.Application.Common.Interfaces;
using MediatR.Pipeline;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Keeper.Application.Common.Behaviours;

public class LoggingBehaviour<TRequest> : IRequestPreProcessor<TRequest> where TRequest : notnull
{
    private readonly ILogger _logger;
    private readonly IAuthenticatedUserService _authenticatedUserService;

    public LoggingBehaviour(ILogger<TRequest> logger, IAuthenticatedUserService authenticatedUserService)
    {
        _logger = logger;
        _authenticatedUserService = authenticatedUserService;
    }

    public Task Process(TRequest request, CancellationToken cancellationToken)
    {
        var user = _authenticatedUserService.User;

        _logger.LogInformation("Id: {Id} | Identity: {User} | IdentityType: {Type} | IP: {IP} | {Request}",
            user?.Id, user?.IdentityName, _authenticatedUserService.User?.UserType.ToString(), _authenticatedUserService.IP, request);

        return Task.CompletedTask;
    }
}