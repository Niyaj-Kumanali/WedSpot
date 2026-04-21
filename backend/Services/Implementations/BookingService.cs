using backend.Models.Entities;
using backend.Repositories;

namespace backend.Services
{
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _bookingRepository;

        public BookingService(IBookingRepository bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        public async Task<List<Booking>> GetAllBookings()
        {
            return await _bookingRepository.GetAllAsync();
        }

        public async Task<List<Booking>> GetBookingsByClient(long clientId)
        {
            return await _bookingRepository.GetByClientIdAsync(clientId);
        }

        public async Task<List<Booking>> GetBookingsByVendor(long vendorId)
        {
            return await _bookingRepository.GetByVendorIdAsync(vendorId);
        }

        public async Task<Booking> CreateBooking(Booking booking)
        {
            await _bookingRepository.AddAsync(booking);
            return booking;
        }

        public async Task<Booking?> UpdateBookingStatus(long id, string status)
        {
            var booking = await _bookingRepository.GetByIdAsync(id);
            if (booking == null) return null;

            booking.Status = status;
            booking.UpdatedAt = DateTime.UtcNow;
            
            await _bookingRepository.UpdateAsync(booking);
            return booking;
        }
    }
}
