namespace Portfolio.Domain.Models;

public class WorkExperience : BaseModel
{
    private WorkExperience()
    {
    }

    public WorkExperience(string company, string endDate, string startDate,
        string position, long portfolioId)
    {
        PortfolioId = portfolioId;
        Company = company;
        EndDate = endDate;
        StartDate = startDate;
        Position = position;
    }

    public long PortfolioId { get; private set; }
    public string Company { get; private set; }
    public string EndDate { get; private set; }
    public string StartDate { get; private set; }
    public string Position { get; private set; }

    public void Update(string company, string position, string startDate, string endDate, long portfolioId)
    {
        PortfolioId = portfolioId;
        Company = company;
        EndDate = endDate;
        StartDate = startDate;
        Position = position;
    }
}