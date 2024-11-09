using Ftsoft.Storage.EntityFramework;
using Portfolio.Domain.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Infrastructure.Storage.Repositories;

public class EducationRepository  : EFRepository<Education, PortfolioDbContext>, IEducationRepository
{
    public EducationRepository(PortfolioDbContext context) : base(context)
    {
    }
}