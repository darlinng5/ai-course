using System.ComponentModel.DataAnnotations;

namespace SpechToText.Models.Entities
{
    public class Message
    {
        [Key]
        public int Id { get; set; }
        public string Text { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsUserMessage { get; set; }

    }
}
