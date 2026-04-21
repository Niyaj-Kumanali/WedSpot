using backend.Models;
using backend.Models.Entities;
using backend.Repositories;

namespace backend.Services
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
            // Demo logic (porting logic from Java)
            var responseData = new
            {
                accessToken = $"demo-jwt-token-{request.Email.Split('@')[0]}",
                role = "Admin", // Logic to fetch from DB
                name = request.Email.Split('@')[0]
            };

            return new APIResponse
            {
                Data = responseData,
                Message = "Login successful"
            };
        }

        public async Task<APIResponse> Register(RegisterRequest request)
        {
            var existingUser = await _userRepository.GetByEmailAsync(request.Email);
            if (existingUser != null)
            {
                return new APIResponse { Message = "Email already exists" };
            }

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = request.Password, // Should be hashed in real implementation
                Role = request.Role
            };

            await _userRepository.AddAsync(user);

            return new APIResponse { Message = "User registered successfully" };
        }

        public async Task<APIResponse> GetUser(long userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
            {
                return new APIResponse { Message = "User not found" };
            }

            var userDto = new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            };

            return new APIResponse
            {
                Data = userDto,
                Message = "User fetched successfully"
            };
        }

        public async Task<APIResponse> GetAllUsers()
        {
            var users = await _userRepository.GetAllAsync();
            var userDtos = users.Select(user => new UserDTO
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            }).ToList();

            return new APIResponse
            {
                Data = userDtos,
                TotalElements = userDtos.Count,
                Message = "Users fetched successfully"
            };
        }

        public async Task<APIResponse> ForgotPassword(ForgotPasswordRequest request)
        {
            // Logic to generate OTP and send email (Demo for now)
            return new APIResponse { Message = "OTP sent to your email" };
        }

        public async Task<APIResponse> ResetPassword(ResetPasswordRequest request)
        {
            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
            {
                return new APIResponse { Message = "User not found" };
            }

            user.Password = request.Password; // Should be hashed
            await _userRepository.UpdateAsync(user);

            return new APIResponse { Message = "Password reset successfully" };
        }

        public async Task<APIResponse> VerifyOtp(VerifyOtpRequest request)
        {
            return new APIResponse { Message = "OTP verified successfully" };
        }

        public async Task<APIResponse> VerifyToken(string token)
        {
            return new APIResponse { Message = "Token is valid" };
        }

        public async Task<APIResponse> Logout(string token)
        {
            return new APIResponse { Message = "Logout successful" };
        }
    }
}
