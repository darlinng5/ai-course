using Microsoft.EntityFrameworkCore;
using SpechToText.Models.Entities;



namespace SpechToText.Data
{
    public class ChatDbContext:DbContext
    {

        public ChatDbContext()
        {
                
        }
        public ChatDbContext(DbContextOptions<ChatDbContext>options):base(options)  
        {
                
        }
        public virtual DbSet<Message> Message { get; set; }
        public virtual DbSet<MessagesType> MessageType { get; set; }    
       
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnection");
            optionsBuilder.UseSqlServer(connectionString);
        }

    }
}
