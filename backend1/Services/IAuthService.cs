using backend.Models;

namespace backend.Services
{
    public interface IAuthService
    {
        Task<APIResponse> Login(LoginRequest request);
        Task<APIResponse> Register(RegisterRequest request);
        Task<APIResponse> ForgotPassword(ForgotPasswordRequest request);
        Task<APIResponse> ResetPassword(ResetPasswordRequest request);
        Task<APIResponse> VerifyOtp(VerifyOtpRequest request);
        Task<APIResponse> VerifyToken(string token);
        Task<APIResponse> Logout(string token);
    }
}
