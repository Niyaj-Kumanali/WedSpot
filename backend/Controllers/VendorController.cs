using Microsoft.AspNetCore.Mvc;
using backend.Models.Entities;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/vendors")]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Vendor>>> GetAllVendors()
        {
            var vendors = await _vendorService.GetAllVendors();
            return Ok(vendors);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Vendor>> GetVendorById(long id)
        {
            var vendor = await _vendorService.GetVendorById(id);
            if (vendor == null) return NotFound();
            return Ok(vendor);
        }

        [HttpGet("category/{category}")]
        public async Task<ActionResult<List<Vendor>>> GetVendorsByCategory(string category)
        {
            var vendors = await _vendorService.GetVendorsByCategory(category);
            return Ok(vendors);
        }

        [HttpGet("premium")]
        public async Task<ActionResult<List<Vendor>>> GetPremiumVendors()
        {
            var vendors = await _vendorService.GetPremiumVendors();
            return Ok(vendors);
        }

        [HttpPost]
        public async Task<ActionResult<Vendor>> CreateVendor([FromBody] Vendor vendor)
        {
            var createdVendor = await _vendorService.CreateVendor(vendor);
            return Ok(createdVendor);
        }
    }
}
