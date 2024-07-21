using Microsoft.EntityFrameworkCore;
using webApi.Entities;
namespace webApi.Data {
    
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
        
        public DbSet<UserModal> Users { get; set; }
        public DbSet<Student> Students { get; set; }
    }
}
