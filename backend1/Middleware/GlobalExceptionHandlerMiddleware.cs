using System.Net;
using System.Text.Json;
using backend.Exceptions;
using backend.Models;

namespace backend.Middleware
{
    public class GlobalExceptionHandlerMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<GlobalExceptionHandlerMiddleware> _logger;

        public GlobalExceptionHandlerMiddleware(RequestDelegate next, ILogger<GlobalExceptionHandlerMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unhandled exception has occurred.");
                await HandleExceptionAsync(context, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var statusCode = HttpStatusCode.InternalServerError;
            var message = "Internal Server Error";
            Dictionary<string, string>? errors = null;

            if (exception is BaseException baseException)
            {
                statusCode = baseException.StatusCode;
                message = baseException.Message;
            }
            // Add more specific exception handling if needed (e.g., validation exceptions)

            var errorResponse = new ErrorResponse
            {
                Timestamp = DateTime.UtcNow,
                StatusCode = (int)statusCode,
                Success = false,
                Message = message,
                Path = context.Request.Path,
                Errors = errors
            };

            var result = JsonSerializer.Serialize(errorResponse);
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)statusCode;

            return context.Response.WriteAsync(result);
        }
    }
}
