using backend.Models.Entities;

namespace backend.Services
{
    public interface IBookingService
    {
        Task<List<Booking>> GetAllBookings();
        Task<List<Booking>> GetBookingsByClient(long clientId);
        Task<List<Booking>> GetBookingsByVendor(long vendorId);
        Task<Booking> CreateBooking(Booking booking);
        Task<Booking?> UpdateBookingStatus(long id, string status);
    }
}
