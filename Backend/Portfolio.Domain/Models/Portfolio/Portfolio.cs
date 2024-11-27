namespace Portfolio.Domain.Models.Portfolio;

public class Portfolio : BaseModel
{
    private Portfolio()
    {
    }
    
    public Portfolio(string name, string shortInfo, string slogan, List<PortfolioContact> contacts, List<string> credits)
    {
        Name = name;
        ShortInfo = shortInfo;
        Contacts = contacts;
        Credits = credits;
        Slogan = slogan;
    }

    public List<string> Credits { get; private set; }
    public string Name { get; private set; }
    public string ShortInfo { get; private set; }
    public string Slogan { get; private set; }
    public List<PortfolioContact> Contacts { get; private set; }

    public void Update(string name, string shortInfo, string slogan, List<PortfolioContact> contacts, List<string> credits)
    {
        Credits = credits;
        Name = name;
        ShortInfo = shortInfo;
        Slogan = slogan;
        Contacts = contacts;
    }
}
