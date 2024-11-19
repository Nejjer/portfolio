namespace Portfolio.Domain.Models;

public class Conference : BaseModel
{
    public Conference(string name, string date, long portfolioId)
    {
        Name = name;
        Date = date;
        PortfolioId = portfolioId;
    }

    public string Name { get; private set; }
    public string Date { get; private set; }

    public long PortfolioId { get; private set; }

    public void Update(string name, string date, long portfolioId)
    {
        Name = name;
        Date = date;
        PortfolioId = portfolioId;
    }
}