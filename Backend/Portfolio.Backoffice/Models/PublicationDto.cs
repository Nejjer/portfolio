using Portfolio.Domain.Models;

namespace Portfolio.Backoffice.Models;

public class PublicationDto : BaseModel
{
    public string Title { get; set; }
    public string Publisher { get; set; }
    public string PublicationDate { get; set; }
    public string Description { get; set; }
    public long PortfolioId { get; set; }
}