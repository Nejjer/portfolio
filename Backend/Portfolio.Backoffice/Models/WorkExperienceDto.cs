using Portfolio.Domain.Models;

namespace Portfolio.Backoffice.Models;

public class WorkExperienceDto : BaseModel
{
    public long Id { get; set; }
    public string Description { get; set; }
    public string StartDate { get; set; }
    public long PortfolioId { get; set; }
}