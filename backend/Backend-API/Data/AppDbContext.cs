using Backend_API.Models.DbModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_API.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Dog> Dogs { get; set; }
        public DbSet<Attraction> Attractions { get; set; }
        public DbSet<Reaction> Reactions { get; set; }
        public DbSet<Chat> Chats { get; set; }
        public DbSet<ChatMessage> ChatMessages { get; set; }


        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Reaction>(builder =>
            {
                builder.HasKey(r => r.Id);
                builder.HasOne(r => r.Dog);
                builder.Navigation(r => r.Dog).IsRequired();
            });

            builder.Entity<ApplicationUser>().HasData(
                new ApplicationUser()
                {
                    Id = "5f8bab53-3cd8-48fb-8563-97687cd286ab",
                    FullName = "TinDog Admin",
                    UserName = "tindogapp44@gmail.com",
                    NormalizedUserName = "TINDOGAPP44@GMAIL.COM",
                    Email = "tindogapp44@gmail.com",
                    NormalizedEmail = "TINDOGAPP44@GMAIL.COM",
                    PasswordHash = "AQAAAAEAACcQAAAAEOPqp45WEFQxgwcMmO+f9GPndvFbKnAPMW2623goci1JjlkBGdTIrEY44+TJz79sHQ==",
                    SecurityStamp = "COZIXSFUJ5FUW6TUBIM3FOSVIP63GXEJ",
                    ConcurrencyStamp = "0ca72488-6b92-4350-93d1-817f04e0844b"
                }
             );
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
          base.OnConfiguring(optionsBuilder);
          optionsBuilder.LogTo(Console.WriteLine);
        }
  }
}
