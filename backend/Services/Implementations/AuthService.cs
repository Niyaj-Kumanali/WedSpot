using backend.Exceptions;
using backend.Models;
using backend.Models.Entities;
using backend.Repositories;

namespace backend.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;

        public AuthService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }



        public async Task<APIResponse> Login(LoginRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
                throw new ResourceNotFoundException("User not found with this email");

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
                throw new InvalidCredentialsException("Invalid password. Please try again.");

            return new APIResponse
            {
                Message = "Login successful",
                Data = new LoginResponse
                {
                    Id = user.Id,
                    AccessToken = $"demo-jwt-token-{user.Name}",
                    Role = user.Role,
                    Name = user.Name,
                    Email = user.Email
                }
            };
        }

        public async Task<APIResponse> Register(RegisterRequest request)
        {
            var existingUser = await _userRepository.GetByEmailAsync(request.Email);

            if (existingUser != null)
                throw new ResourceAlreadyExistsException("An account with this email already exists");

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(request.Password),
                Role = request.Role,
                PhoneNumber = request.PhoneNumber,
                Location = request.Location
            };

            await _userRepository.AddAsync(user);

            return new APIResponse
            {
                Message = "User registered successfully",
                Data = new LoginResponse
                {
                    Id = user.Id,
                    AccessToken = $"demo-jwt-token-{user.Name}",
                    Role = user.Role,
                    Name = user.Name,
                    Email = user.Email
                }
            };
        }

        public async Task<APIResponse> ForgotPassword(ForgotPasswordRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);

            if (user == null)
                throw new ResourceNotFoundException("No account found with this email");

            return new APIResponse { Message = "OTP sent to your email" };
        }

        public async Task<APIResponse> ResetPassword(ResetPasswordRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);

            if (user == null)
                throw new ResourceNotFoundException("No account found with this email");

            user.Password = BCrypt.Net.BCrypt.HashPassword(request.Password);
            await _userRepository.UpdateAsync(user);

            return new APIResponse { Message = "Password reset successfully" };
        }

        public Task<APIResponse> VerifyOtp(VerifyOtpRequest request)
        {
            return Task.FromResult(new APIResponse { Message = "OTP verified successfully" });
        }

        public Task<APIResponse> VerifyToken(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
                throw new InvalidCredentialsException("Token is missing or invalid");

            return Task.FromResult(new APIResponse { Message = "Token is valid" });
        }

        public Task<APIResponse> Logout(string token)
        {
            return Task.FromResult(new APIResponse { Message = "Logout successful" });
        }
    }
}
