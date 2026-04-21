using backend.Data;
using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AppDbContext _context;

        public BookingRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Booking?> GetByIdAsync(long id)
        {
            return await _context.Bookings.FindAsync(id);
        }

        public async Task<List<Booking>> GetAllAsync()
        {
            return await _context.Bookings.ToListAsync();
        }

        public async Task<List<Booking>> GetByClientIdAsync(long clientId)
        {
            return await _context.Bookings.Where(b => b.ClientId == clientId).ToListAsync();
        }

        public async Task<List<Booking>> GetByVendorIdAsync(long vendorId)
        {
            return await _context.Bookings.Where(b => b.VendorId == vendorId).ToListAsync();
        }

        public async Task<List<Booking>> GetByStatusAsync(string status)
        {
            return await _context.Bookings.Where(b => b.Status == status).ToListAsync();
        }

        public async Task AddAsync(Booking booking)
        {
            await _context.Bookings.AddAsync(booking);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Booking booking)
        {
            _context.Bookings.Update(booking);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(long id)
        {
            var booking = await GetByIdAsync(id);
            if (booking != null)
            {
                _context.Bookings.Remove(booking);
                await _context.SaveChangesAsync();
            }
        }
    }
}
