namespace Portfolio.Domain.Models;

public class WorkExperience : BaseModel
{
    private WorkExperience()
    {
    }

    public WorkExperience(string description, string startDate, long portfolioId)
    {
        PortfolioId = portfolioId;
        Description = description;
        StartDate = startDate;
    }

    public long PortfolioId { get; private set; }
    public string Description { get; private set; }
    public string StartDate { get; private set; }

    public void Update(string company, string startDate, long portfolioId)
    {
        PortfolioId = portfolioId;
        Description = company;
        StartDate = startDate;
    }
}