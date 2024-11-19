using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Portfolio.Infrastructure.Storage.TypeConfigurations;

public class PortfolioTypeConfiguration : IEntityTypeConfiguration<Domain.Models.Portfolio.Portfolio>
{
    public void Configure(EntityTypeBuilder<Domain.Models.Portfolio.Portfolio> builder)
    {
        builder.OwnsMany(x => x.Contacts, o => o.ToJson());
    }
}