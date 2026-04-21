using backend.Models.Entities;

namespace backend.Services
{
    public interface IVendorService
    {
        Task<List<Vendor>> GetAllVendors();
        Task<Vendor?> GetVendorById(long id);
        Task<List<Vendor>> GetVendorsByCategory(string category);
        Task<List<Vendor>> GetPremiumVendors();
        Task<Vendor> CreateVendor(Vendor vendor);
    }
}
