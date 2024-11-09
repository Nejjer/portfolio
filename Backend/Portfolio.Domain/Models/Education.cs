namespace Portfolio.Domain.Models;

public class Education : BaseModel
{
    public Education(string name, int endYear, int startYear, string fieldOfStudy, string degree, string institution,
        long portfolioId)
    {
        Name = name;
        PortfolioId = portfolioId;
        EndYear = endYear;
        StartYear = startYear;
        FieldOfStudy = fieldOfStudy;
        Degree = degree;
        Institution = institution;
    }

    public string Name { get; private set; }
    public string Institution { get; private set; }
    public string Degree { get; private set; }
    public string FieldOfStudy { get; private set; }
    public int StartYear { get; private set; }
    public int EndYear { get; private set; }

    public long PortfolioId { get; private set; }

    public void Update(string name, string institution, string degree, string fieldOfStudy, int startYear,
        int endYear, long portfolioId)
    {
        Name = name;
        Institution = institution;
        Degree = degree;
        FieldOfStudy = fieldOfStudy;
        StartYear = startYear;
        EndYear = endYear;
        PortfolioId = portfolioId;
    }
}