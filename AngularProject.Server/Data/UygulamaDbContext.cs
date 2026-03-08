using AngularProject.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace AngularProject.Server.Data
{
    public class UygulamaDbContext : DbContext
    {
        public UygulamaDbContext(DbContextOptions<UygulamaDbContext> options) : base(options) { }

        public DbSet<Personel> Personeller { get; set; }
        public DbSet<User> Users { get; set; } // YENİ EKLENEN SATIR
    }
}