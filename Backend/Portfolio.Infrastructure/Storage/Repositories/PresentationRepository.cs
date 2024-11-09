using Ftsoft.Storage.EntityFramework;
using Portfolio.Domain.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Infrastructure.Storage.Repositories;

public class PresentationRepository : EFRepository<Presentation, PortfolioDbContext>, IPresentationRepository
{
    public PresentationRepository(PortfolioDbContext context) : base(context)
    {
    }
}