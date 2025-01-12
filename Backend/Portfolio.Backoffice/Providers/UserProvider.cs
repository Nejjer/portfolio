using System.Reflection.Metadata;
using Portfolio.Backoffice.Auth;

namespace Portfolio.Backoffice.Providers;

public class UserProvider(IHttpContextAccessor httpContextAccessor) : IUserProvider
{
    public IReadOnlyList<long> GetAvailablePortfolios()
    {
        var user = httpContextAccessor.HttpContext?.User;
        var portfoliosString = user?.FindFirst(CustomerCustomClaims.Porfolios)?.Value;
        if (string.IsNullOrEmpty(portfoliosString))
        {
            return Array.Empty<long>();
        }
        var portfolios = portfoliosString.Split(',').Select(long.Parse).ToList();
        return portfolios;
    }
    public string? GetUserEmail()
    {
        var user = httpContextAccessor.HttpContext?.User;
        var email = user?.FindFirst(CustomerCustomClaims.Email)?.Value;
        return email;
    }
}