using Keeper.Application.Common.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

namespace Keeper.Infrastructure.HostedServices;

public class AutomationRunTiming
{
    public int Hour { get; set; }
    public int Minute { get; set; }
}

public class AutomatedTimingActionHostedService : BackgroundService
{
    private readonly IKeeperDbContextFactory _keeperFactory;
    private readonly AutomationRunTiming _automationTiming;
    private readonly IJwtService _jwtService;
    public AutomatedTimingActionHostedService(IKeeperDbContextFactory keeperFactory, IConfiguration configuration, IJwtService jwtService)
    {
        _keeperFactory = keeperFactory;
        _jwtService = jwtService;
        _automationTiming = configuration.GetSection(nameof(AutomationRunTiming)).Get<AutomationRunTiming>()!;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            if (DateTime.Now.Hour == _automationTiming.Hour && DateTime.Now.Minute == _automationTiming.Minute)
            {
                await _jwtService.DeleteExpiredRefreshTokens();
            }
            await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
        }
    }
}