namespace Portfolio.Backoffice.Providers;

public interface IUserProvider
{
    public IReadOnlyList<long> GetAvailablePortfolios();
    public string? GetUserEmail();
}