using Ftsoft.Storage.EntityFramework;
using Portfolio.Domain.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Infrastructure.Storage.Repositories;

public class WorkExperienceRepository : EFRepository<WorkExperience, PortfolioDbContext>, IWorkExperienceRepository
{
    public WorkExperienceRepository(PortfolioDbContext context) : base(context)
    {
    }
}