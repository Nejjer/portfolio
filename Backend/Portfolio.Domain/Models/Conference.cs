namespace Portfolio.Domain.Models;

public class Conference : BaseModel
{
    public Conference(string name, string date, long portfolioId, string image)
    {
        Name = name;
        Date = date;
        PortfolioId = portfolioId;
        Image = image;
    }

    public string Name { get; private set; }
    public string Date { get; private set; }
    public string Image { get; private set; }

    public long PortfolioId { get; private set; }

    public void Update(string name, string date, long portfolioId, string image)
    {
        Image = image; 
        Name = name;
        Date = date;
        PortfolioId = portfolioId;
    }
}