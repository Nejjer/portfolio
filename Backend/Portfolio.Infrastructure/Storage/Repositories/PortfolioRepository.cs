using Ftsoft.Storage.EntityFramework;
using Portfolio.Domain.Repositories;

namespace Portfolio.Infrastructure.Storage.Repositories;

public class PortfolioRepository : EFRepository<Domain.Models.Portfolio.Portfolio, PortfolioDbContext>, IPortfolioRepository
{
    public PortfolioRepository(PortfolioDbContext context) : base(context)
    {
    }
}