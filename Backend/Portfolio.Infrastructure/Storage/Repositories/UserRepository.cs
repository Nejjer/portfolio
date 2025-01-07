using Ftsoft.Storage.EntityFramework;
using Portfolio.Domain.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Infrastructure.Storage.Repositories;

public class UserRepository : EFRepository<User, PortfolioDbContext>, IUserRepository
{
    public UserRepository(PortfolioDbContext context) : base(context)
    {
    }
}