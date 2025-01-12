namespace Portfolio.Domain.Models;

public class User : BaseModel
{
    private User()
    {
    }

    public User(string email, string password)
    {
        Email = email;
        Password = password;
        PortfolioIds = [];
    }
    public string Email { get; private set; }
    public string Password { get; private set; }
    public List<long> PortfolioIds { get; private set; } = [];

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