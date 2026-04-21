using backend.Models.Entities;
using backend.Repositories;

namespace backend.Services
{
    public class VendorService : IVendorService
    {
        private readonly IVendorRepository _vendorRepository;

        public VendorService(IVendorRepository vendorRepository)
        {
            _vendorRepository = vendorRepository;
        }

        public async Task<List<Vendor>> GetAllVendors()
        {
            return await _vendorRepository.GetAllAsync();
        }

        public async Task<Vendor?> GetVendorById(long id)
        {
            return await _vendorRepository.GetByIdAsync(id);
        }

        public async Task<List<Vendor>> GetVendorsByCategory(string category)
        {
            return await _vendorRepository.GetByCategoryAsync(category);
        }

        public async Task<List<Vendor>> GetPremiumVendors()
        {
            return await _vendorRepository.GetPremiumVendorsAsync();
        }

        public async Task<Vendor> CreateVendor(Vendor vendor)
        {
            await _vendorRepository.AddAsync(vendor);
            return vendor;
        }
    }
}
