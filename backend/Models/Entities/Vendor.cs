using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("vendors")]
    public class Vendor
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        public string BusinessName { get; set; } = string.Empty;

        public string? Description { get; set; }

        public string? Category { get; set; }

        public string? PriceRange { get; set; }

        public string? Location { get; set; }

        public double Rating { get; set; } = 0.0;

        public int ReviewCount { get; set; } = 0;

        public string? ImageUrl { get; set; }

        public bool Verified { get; set; } = false;

        public bool Premium { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
