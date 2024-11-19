namespace Portfolio.Domain.Models.Portfolio;

public class Portfolio : BaseModel
{
    private Portfolio() {}
    
    public Portfolio(string name, string shortInfo, string slogan, List<PortfolioContact> contacts)
    {
        Name = name;
        ShortInfo = shortInfo;
        Contacts = contacts;
        Slogan = slogan;
    }

    public string Name { get; private set; }
    public string ShortInfo { get; private set; }
    public string Slogan { get; private set; }
    public List<PortfolioContact> Contacts { get; private set; }

    public void Update(string name, string shortInfo, string slogan, List<PortfolioContact> contacts)
    {
        Name = name;
        ShortInfo = shortInfo;
        Slogan = slogan;
        Contacts = contacts;
    }
}
