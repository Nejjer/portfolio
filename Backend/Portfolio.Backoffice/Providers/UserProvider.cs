using Portfolio.Backoffice.Auth;

namespace Portfolio.Backoffice.Providers;

public class UserProvider(IHttpContextAccessor httpContextAccessor) : IUserProvider
{
    public IReadOnlyList<long> GetAvailablePortfolios()
    {
        var user = httpContextAccessor.HttpContext?.User;
        var portfoliosString = user?.FindFirst(CustomerCustomClaims.Porfolios)?.Value;
        if (portfoliosString is null)
        {
            return Array.Empty<long>();
        }
        var portfolios = portfoliosString.Split(',').Select(long.Parse).ToList();
        return portfolios;
    }
}