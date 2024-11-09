namespace Portfolio.Domain.Models;

public class Publication : BaseModel
{
    private Publication()
    {
    }

    public Publication(string title, string description, string publicationDate, string publisher, long portfolioId)
    {
        Title = title;
        Description = description;
        PortfolioId = portfolioId;
        PublicationDate = publicationDate;
        Publisher = publisher;
    }

    public string Description { get; private set; }
    public string Title { get; private set; }
    public string PublicationDate { get; private set; }
    public string Publisher { get; private set; }

    public long PortfolioId { get; private set; }

    public void Update(string title, string publisher, string publicationDate, string description, long portfolioId)
    {
        Title = title;
        Description = description;
        PortfolioId = portfolioId;
        PublicationDate = publicationDate;
        Publisher = publisher;
    }
}