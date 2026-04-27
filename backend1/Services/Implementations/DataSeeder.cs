using backend.Models.Entities;
using backend.Repositories;

namespace backend.Services.Implementations
{
    public class DataSeeder
    {

        private readonly IUserRepository _userRepository;

        public DataSeeder(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task SeedUserAsync()
        {
            var defaultPassword = BCrypt.Net.BCrypt.HashPassword("1234567890");
            var defaultPhone = "1234567890";

            var UsersToSeed = new List<User>
            {
                new()
                {
                    Name = "Admin Kumar",
                    Email = "admin@gmail.com",
                    Password = defaultPassword,
                    Role = "Admin",
                    PhoneNumber = defaultPhone,
                    Location = "India"
                },
                new()
                {
                    Name = "Manager Singh",
                    Email = "manager@gmail.com",
                    Password = defaultPassword,
                    Role = "Manager",
                    PhoneNumber = defaultPhone,
                    Location = "India"
                },
                new()
                {
                    Name = "Staff Raj",
                    Email = "staff@gmail.com",
                    Password = defaultPassword,
                    Role = "Staff",
                    PhoneNumber = defaultPhone,
                    Location = "India"
                },
                new()
                {
                    Name = "Vendor Mehta",
                    Email = "vendor@gmail.com",
                    Password = defaultPassword,
                    Role = "Vendor",
                    PhoneNumber = defaultPhone,
                    Location = "India"
                },
                new()
                {
                    Name = "Client Sharma",
                    Email = "client@gmail.com",
                    Password = defaultPassword,
                    Role = "Client",
                    PhoneNumber = defaultPhone,
                    Location = "India"
                }
            };

            foreach (User user in UsersToSeed)
            {
                var existingUser = await _userRepository.GetByEmailAsync(user.Email);
                if (existingUser == null)
                {
                    await _userRepository.AddAsync(user);
                }
            }
        }
    }
}
