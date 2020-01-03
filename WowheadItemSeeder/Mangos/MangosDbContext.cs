using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using MySql.Data.EntityFrameworkCore.Extensions;

namespace WowheadItemSeeder.Mangos
{
    public class MangosDbContext : DbContext
    {
        public DbSet<ItemTemplate> ItemTemplates { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySQL("server=localhost;database=classicmangos;user=root;password=P@ssw0rd!");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ItemTemplate>(entity => 
            {
                entity.ToTable("item_template");
                entity.HasKey(i => i.entry);
                entity.Property(i => i._class).HasColumnName("class");
            });
        }
    }
}
