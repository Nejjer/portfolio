namespace Portfolio.Backoffice.Models;

public class EducationDto
{
    public long Id { get; set; }
    public string Name { get; set; }
    public string Institution { get; set; }
    public string Degree { get; set; }
    public string FieldOfStudy { get; set; }
    public int StartYear { get; set; }
    public int EndYear { get; set; }
    public long PortfolioId { get; set; }
}