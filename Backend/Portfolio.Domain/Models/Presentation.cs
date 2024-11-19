namespace Portfolio.Domain.Models;

public class Presentation : BaseModel
{
    public Presentation(string title, string link, string @event, string presentationDate, string description,
        long portfolioId)
    {
        Title = title;
        Link = link;
        Event = @event;
        PresentationDate = presentationDate;
        Description = description;
        PortfolioId = portfolioId;
    }

    public string Title { get; private set; }
    public string Event { get; private set; }
    public string PresentationDate { get; private set; }
    public string Description { get; private set; }
    public string Link { get; private set; }

    public long PortfolioId { get; private set; }

    public void Update(string title, string link, string @event, string presentationDate, string description, long portfolioId)
    {
        Title = title;
        Link = link;
        Event = @event;
        PresentationDate = presentationDate;
        Description = description;
        PortfolioId = portfolioId;
    }
}