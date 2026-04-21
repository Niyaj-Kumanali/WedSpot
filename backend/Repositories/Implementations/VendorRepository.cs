using backend.Data;
using backend.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class VendorRepository : IVendorRepository
    {
        private readonly AppDbContext _context;

        public VendorRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Vendor?> GetByIdAsync(long id)
        {
            return await _context.Vendors.FindAsync(id);
        }

        public async Task<List<Vendor>> GetAllAsync()
        {
            return await _context.Vendors.ToListAsync();
        }

        public async Task<List<Vendor>> GetByCategoryAsync(string category)
        {
            return await _context.Vendors.Where(v => v.Category == category).ToListAsync();
        }

        public async Task<List<Vendor>> GetPremiumVendorsAsync()
        {
            return await _context.Vendors.Where(v => v.Premium).ToListAsync();
        }

        public async Task AddAsync(Vendor vendor)
        {
            await _context.Vendors.AddAsync(vendor);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Vendor vendor)
        {
            _context.Vendors.Update(vendor);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(long id)
        {
            var vendor = await GetByIdAsync(id);
            if (vendor != null)
            {
                _context.Vendors.Remove(vendor);
                await _context.SaveChangesAsync();
            }
        }
    }
}
