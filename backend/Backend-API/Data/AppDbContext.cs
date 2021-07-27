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

/*            builder.Entity<Chat>(builder =>
            {
                builder.HasKey(c => c.Id);
                builder.HasMany(c => c.Messages).WithOne(cm => cm.Chat);
                builder.HasOne(c => c.Adopter);
                builder.HasOne(c => c.DogOwner);
                builder.HasOne(c => c.Dog);
            });*/

            builder.Entity<Attraction>().HasData(
              new Attraction()
              {
                Id = 1,
                Name = "חוף עליה תל אביב יפו",
                ImageURL = "https://lh5.googleusercontent.com/p/AF1QipMhf6Z16ZIfaq2XwW-hSZCOjndODw_Nnn_6-Hs=w408-h304-k-no",
                Address = "יפת, קדם, תל אביב יפו",
                Latitude = 32.03933238935309,
                Longitude = 34.74541685580131
              },
              new Attraction()
              {
                Id = 2,
                Name = "חוף הכלבים",
                Address = "טיילת שלמה להט, תל אביב יפו",
                ImageURL = "https://lh5.googleusercontent.com/p/AF1QipM3-k-Cx-grQzaczPPEGdDBbx7ErjzihT8yUdud=w408-h306-k-no",
                Latitude = 32.0930604126831,
                Longitude = 34.770929383805104
              },
              new Attraction()
              {
                Id = 3,
                Name = "חוף הכלבים הצפוני - תל ברוך",
                Address = "שביל ישראל, תל אביב יפו",
                ImageURL = "https://lh5.googleusercontent.com/p/AF1QipPeRLFHW8modnyo7mN4AD6XEDgDieF4CIzJmMQ4=w408-h306-k-no",
                Latitude = 32.116458689969946,
                Longitude = 34.77986318877991
              },
              new Attraction()
              {
                Id = 4,
                Name = "חוף הצוק הצפוני",
                Address = "תל אביב יפו",
                ImageURL = "https://lh5.googleusercontent.com/p/AF1QipOXwbXKGAlscGmDZ_0n6z_fgdcfUsxP6FpTV-dS=w408-h306-k-no",
                Latitude = 32.14448623883102,
                Longitude = 34.79094215573342
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
