using Ftsoft.Storage.EntityFramework;
using Portfolio.Domain.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Infrastructure.Storage.Repositories;

public class PublicationRepository : EFRepository<Publication, PortfolioDbContext>, IPublicationRepository
{
    public PublicationRepository(PortfolioDbContext context) : base(context)
    {
    }
}