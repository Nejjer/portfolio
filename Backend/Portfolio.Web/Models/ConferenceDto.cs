using Portfolio.Domain.Models;

namespace Portfolio.Web.Models;

public class ConferenceDto : BaseModel
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Date { get;  set; }
    public long PortfolioId { get; set; }
}