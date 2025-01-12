namespace Portfolio.Domain.Models;

public class User : BaseModel
{
    private User()
    {
    }

    public User(string email, string password, List<long> portfolioIds)
    {
        Email = email;
        Password = password;
        PortfolioIds = portfolioIds;
    }
    public string Email { get; private set; }
    public string Password { get; private set; }
    public List<long> PortfolioIds { get; set; }

    public void Update(string password)
    {
        Password = password;
    }
    
    public void AddPortfolio(long id)
    {
        PortfolioIds.Add(id);
    }

    public void RemovePortfolio(long portfolioId)
    {
        PortfolioIds.Remove(portfolioId);
    }
}