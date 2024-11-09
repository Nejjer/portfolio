using Portfolio.Domain.Models;

namespace Portfolio.Web.Models;

public class PresentationDto : BaseModel
{
    public string Link { get; set; }
    public string Title { get; set; }
    public string Event { get; set; }
    public string PresentationDate { get; set; }
    public string Description { get; set; }

    public long PortfolioId { get; set; }
}