using backend.Models.Entities;

namespace backend.Repositories
{
    public interface IBookingRepository
    {
        Task<Booking?> GetByIdAsync(long id);
        Task<List<Booking>> GetAllAsync();
        Task<List<Booking>> GetByClientIdAsync(long clientId);
        Task<List<Booking>> GetByVendorIdAsync(long vendorId);
        Task<List<Booking>> GetByStatusAsync(string status);
        Task AddAsync(Booking booking);
        Task UpdateAsync(Booking booking);
        Task DeleteAsync(long id);
    }
}
