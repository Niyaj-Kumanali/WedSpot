using backend.Exceptions;
using backend.Models;
using backend.Models.Entities;
using backend.Repositories;

namespace backend.Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<APIResponse> GetUser(long userId)
        {
            var user = await _userRepository.GetByIdAsync(userId);

            if (user == null)
                throw new ResourceNotFoundException("User not found");

            return new APIResponse
            {
                Data = new UserDTO
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role,
                    PhoneNumber = user.PhoneNumber,
                    Location = user.Location
                },
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
                Role = user.Role,
                PhoneNumber = user.PhoneNumber,
                Location = user.Location
            }).ToList();

            return new APIResponse
            {
                Data = userDtos,
                TotalElements = userDtos.Count,
                PageNumber = 1,
                PageSize = userDtos.Count,
                TotalPages = 1,
                Message = "Users fetched successfully"
            };
        }

        public async Task<APIResponse> UpdateUser(long id, UpdateUserRequest request)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
                throw new ResourceNotFoundException("User not found");

            user.Name = request.Name;
            user.PhoneNumber = request.PhoneNumber;
            user.Location = request.Location;
            user.UpdatedAt = DateTime.UtcNow;

            await _userRepository.UpdateAsync(user);

            return new APIResponse
            {
                Data = new UserDTO
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Role = user.Role,
                    PhoneNumber = user.PhoneNumber,
                    Location = user.Location
                },
                Message = "Profile updated successfully"
            };
        }

        public async Task<APIResponse> UpdatePassword(long id, UpdatePasswordRequest request)
        {
            var user = await _userRepository.GetByIdAsync(id);

            if (user == null)
                throw new ResourceNotFoundException("User not found");

            // Verify current password
            if (!BCrypt.Net.BCrypt.Verify(request.CurrentPassword, user.Password))
                throw new InvalidCredentialsException("Current password is incorrect");

            // Hash and update new password
            user.Password = BCrypt.Net.BCrypt.HashPassword(request.NewPassword);
            user.UpdatedAt = DateTime.UtcNow;

            await _userRepository.UpdateAsync(user);

            return new APIResponse
            {
                Message = "Password updated successfully"
            };
        }
    }
}
