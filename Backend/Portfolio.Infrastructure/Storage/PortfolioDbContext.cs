using Ftsoft.Storage;
using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Models;

namespace Portfolio.Infrastructure.Storage;

public class PortfolioDbContext : DbContext, IUnitOfWork
{
    public PortfolioDbContext(DbContextOptions options) : base(options)
    {
    }

    public PortfolioDbContext()
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PortfolioDbContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
    
    public DbSet<Conference> Conferences { get; set; }
    public DbSet<Education> Educations { get; set; }
    public DbSet<Domain.Models.Portfolio.Portfolio> Portfolios { get; set; }
    public DbSet<Presentation> Presentations { get; set; }
    public DbSet<Publication> Publications { get; set; }
    public DbSet<WorkExperience> WorkExperiences { get; set; }
}