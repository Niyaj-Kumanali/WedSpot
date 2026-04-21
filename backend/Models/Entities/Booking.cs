using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("bookings")]
    public class Booking
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public long ClientId { get; set; }

        public long VendorId { get; set; }

        public string? VendorName { get; set; }

        public DateTime? EventDate { get; set; }

        public string? EventType { get; set; }

        public string Status { get; set; } = "PENDING";

        public double? TotalAmount { get; set; }

        public double? DepositAmount { get; set; }

        public string? Notes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
