using System.Text.Json;

namespace Keeper.WebApi.Middlewares;


public class UserFriendlyError
{
    public int Code { get; }
    public string Type { get; }
    public string Message { get; }

    public UserFriendlyError(string message, int code, string type)
    {
        Code = code;
        Type = type;
        Message = message;
    }

    public override string ToString()
    {
        return JsonSerializer.Serialize(this);
    }
}

public class UnhandledExceptionMiddleware : IMiddleware
{
    private readonly ILogger<UnhandledExceptionMiddleware> _logger;
    public UnhandledExceptionMiddleware(ILogger<UnhandledExceptionMiddleware> logger)
    {
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
#if DEBUG
        await next(context);
#else
        try
        {
            await next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled Exception Caught");
            //
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            await context.Response.WriteAsync(new UserFriendlyError(ex.Message, context.Response.StatusCode, ex.GetType().Name).ToString());
        }
    
#endif
    }
}