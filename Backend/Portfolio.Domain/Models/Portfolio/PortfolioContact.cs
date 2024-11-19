namespace Portfolio.Domain.Models.Portfolio;

public class PortfolioContact
{
    private PortfolioContact() {}
    
    public PortfolioContact(string name, string value)
    {
        Name = name;
        Value = value;
    }
    
    public string Name { get; private set; }
    public string Value { get; private set; }
}