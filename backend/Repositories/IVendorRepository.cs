using backend.Models.Entities;

namespace backend.Repositories
{
    public interface IVendorRepository
    {
        Task<Vendor?> GetByIdAsync(long id);
        Task<List<Vendor>> GetAllAsync();
        Task<List<Vendor>> GetByCategoryAsync(string category);
        Task<List<Vendor>> GetPremiumVendorsAsync();
        Task AddAsync(Vendor vendor);
        Task UpdateAsync(Vendor vendor);
        Task DeleteAsync(long id);
    }
}
