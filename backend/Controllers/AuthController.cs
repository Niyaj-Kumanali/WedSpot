using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<APIResponse>> Login([FromBody] LoginRequest request)
        {
            var response = await _authService.Login(request);
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<ActionResult<APIResponse>> Register([FromBody] RegisterRequest request)
        {
            var response = await _authService.Register(request);
            return Ok(response);
        }

        [HttpPost("forgot-password")]
        public async Task<ActionResult<APIResponse>> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var response = await _authService.ForgotPassword(request);
            return Ok(response);
        }

        [HttpPost("reset-password")]
        public async Task<ActionResult<APIResponse>> ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var response = await _authService.ResetPassword(request);
            return Ok(response);
        }

        [HttpPost("verify-otp")]
        public async Task<ActionResult<APIResponse>> VerifyOtp([FromBody] VerifyOtpRequest request)
        {
            var response = await _authService.VerifyOtp(request);
            return Ok(response);
        }

        [HttpPost("verify-token")]
        public async Task<ActionResult<APIResponse>> VerifyToken([FromBody] Dictionary<string, string> payload)
        {
            if (payload.TryGetValue("token", out var token))
            {
                var response = await _authService.VerifyToken(token);
                return Ok(response);
            }
            return BadRequest(new APIResponse { Message = "Token is required" });
        }

        [HttpPost("logout")]
        public async Task<ActionResult<APIResponse>> Logout([FromHeader(Name = "Authorization")] string token)
        {
            var response = await _authService.Logout(token);
            return Ok(response);
        }
    }
}
