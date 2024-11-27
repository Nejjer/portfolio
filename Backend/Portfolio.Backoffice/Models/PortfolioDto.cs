namespace Portfolio.Backoffice.Models;

public class PortfolioDto
{
    public string Name { get; set; }
    public string ShortInfo { get; set; }
    public string Slogan { get; set; }
    public List<PortfolioContactDto> Contacts { get; set; }
    public List<string> Credits { get; set; }
}