using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ConsultanceService.DAL
{
    public class TeleHealthContext : DbContext
    {
        public TeleHealthContext(DbContextOptions<TeleHealthContext> options) : base(options) { }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
        //entities
        public DbSet<PatientDocument> PatientDocuments { get; set; }
    }
}
