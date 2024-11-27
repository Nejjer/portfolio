namespace Portfolio.Domain.Models;

public class Presentation : BaseModel
{
    private Presentation() {}
    
    public Presentation(string title, string link, string description,
        long portfolioId, string image)
    {
        Title = title;
        Link = link;
        Description = description;
        PortfolioId = portfolioId;
        Image = image;
    }

    public string Title { get; private set; }
    public string Description { get; private set; }
    public string Image { get; private set; }
    public string Link { get; private set; }

    public long PortfolioId { get; private set; }

    public void Update(string title, string link, string description, long portfolioId, string image)
    {
        Title = title;
        Link = link;
        Description = description;
        PortfolioId = portfolioId;
        Image = image;
    }
}