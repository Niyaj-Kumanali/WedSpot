namespace backend.Models
{
    public class APIResponse
    {
        public object? Data { get; set; }
        public string Message { get; set; } = string.Empty;
        public long? TotalElements { get; set; }
        public int? PageNumber { get; set; }
        public int? TotalPages { get; set; }

        public int? PageSize { get; set; }

        public Boolean Ok { get; set; } = true;

    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class LoginResponse
    {
        public long Id { get; set; }
        public string AccessToken { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }

    public class ErrorResponse
    {
        public DateTime Timestamp { get; set; } = DateTime.UtcNow;
        public int StatusCode { get; set; }
        public bool Success { get; set; } = false;
        public string Message { get; set; } = string.Empty;
        public string Path { get; set; } = string.Empty;
        public Dictionary<string, string>? Errors { get; set; }
    }

    public class RegisterRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = "Client";
        public string PhoneNumber { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
    }

    public class UserDTO
    {
        public long Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
    }

    public class ForgotPasswordRequest
    {
        public string Email { get; set; } = string.Empty;
    }

    public class ResetPasswordRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class VerifyOtpRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Otp { get; set; } = string.Empty;
    }

    public class UpdateUserRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
    }

    public class UpdatePasswordRequest
    {
        public string CurrentPassword { get; set; } = string.Empty;
        public string NewPassword { get; set; } = string.Empty;
    }
}
