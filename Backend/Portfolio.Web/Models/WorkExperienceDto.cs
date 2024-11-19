using Portfolio.Domain.Models;

namespace Portfolio.Web.Models;

public class WorkExperienceDto : BaseModel
{
    public long Id { get; set; }
    public string Name { get; set; }
    public long Year { get; set; }
    public string Company { get; set; }
    public string Position { get; set; }
    public string StartDate { get; set; }
    public string EndDate { get; set; }
    public long PortfolioId { get; set; }
}