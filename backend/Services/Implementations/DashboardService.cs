using backend.Repositories;

namespace backend.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IUserRepository _userRepository;
        private readonly IVendorRepository _vendorRepository;
        private readonly IBookingRepository _bookingRepository;

        public DashboardService(IUserRepository userRepository, IVendorRepository vendorRepository, IBookingRepository bookingRepository)
        {
            _userRepository = userRepository;
            _vendorRepository = vendorRepository;
            _bookingRepository = bookingRepository;
        }

        public async Task<Dictionary<string, object>> GetDashboardStats()
        {
            var users = await _userRepository.GetAllAsync();
            var vendors = await _vendorRepository.GetAllAsync();
            var bookings = await _bookingRepository.GetAllAsync();

            return new Dictionary<string, object>
            {
                { "totalUsers", users.Count },
                { "totalVendors", vendors.Count },
                { "totalBookings", bookings.Count },
                { "revenue", 15000.50 } // Dummy revenue
            };
        }
    }
}
