using Microsoft.AspNetCore.Mvc;
using backend.Models.Entities;
using backend.Services;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/v1/bookings")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Booking>>> GetAllBookings()
        {
            var bookings = await _bookingService.GetAllBookings();
            return Ok(bookings);
        }

        [HttpGet("client/{clientId}")]
        public async Task<ActionResult<List<Booking>>> GetBookingsByClient(long clientId)
        {
            var bookings = await _bookingService.GetBookingsByClient(clientId);
            return Ok(bookings);
        }

        [HttpGet("vendor/{vendorId}")]
        public async Task<ActionResult<List<Booking>>> GetBookingsByVendor(long vendorId)
        {
            var bookings = await _bookingService.GetBookingsByVendor(vendorId);
            return Ok(bookings);
        }

        [HttpPost]
        public async Task<ActionResult<Booking>> CreateBooking([FromBody] Booking booking)
        {
            var createdBooking = await _bookingService.CreateBooking(booking);
            return Ok(createdBooking);
        }

        [HttpPatch("{id}/status")]
        public async Task<ActionResult<Booking>> UpdateBookingStatus(long id, [FromBody] Dictionary<string, string> statusMap)
        {
            if (statusMap.TryGetValue("status", out var status))
            {
                var updatedBooking = await _bookingService.UpdateBookingStatus(id, status);
                if (updatedBooking == null) return NotFound();
                return Ok(updatedBooking);
            }
            return BadRequest("Status is required");
        }
    }
}
