using Ftsoft.Storage.EntityFramework;
using Portfolio.Domain.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Infrastructure.Storage.Repositories;

public class ConferenceRepository : EFRepository<Conference, PortfolioDbContext>, IConferenceRepository
{
    public ConferenceRepository(PortfolioDbContext context) : base(context)
    {
    }
}