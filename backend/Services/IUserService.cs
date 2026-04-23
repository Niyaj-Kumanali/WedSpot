using backend.Models;

namespace backend.Services
{
    public interface IUserService
    {
        Task<APIResponse> GetUser(long userId);
        Task<APIResponse> GetAllUsers();
        Task<APIResponse> UpdateUser(long id, UpdateUserRequest request);
        Task<APIResponse> UpdatePassword(long id, UpdatePasswordRequest request);
    }
}
