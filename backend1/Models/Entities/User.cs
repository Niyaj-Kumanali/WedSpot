using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models.Entities
{
    [Table("users")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("ID")]
        public long Id { get; set; }

        [Column("NAME")]
        public string Name { get; set; } = string.Empty;

        [Column("EMAIL")]
        public string Email { get; set; } = string.Empty;

        [Column("PASSWORD")]
        public string Password { get; set; } = string.Empty;

        [Column("ROLE")]
        public string Role { get; set; } = string.Empty;

        [Column("PHONE_NUMBER")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Column("LOCATION")]
        public string Location { get; set; } = string.Empty;

        [Column("ENABLED")]
        public bool Enabled { get; set; } = true;

        [Column("CREATED_AT")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("UPDATED_AT")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
