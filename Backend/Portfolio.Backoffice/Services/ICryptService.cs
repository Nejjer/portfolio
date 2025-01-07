namespace Portfolio.Backoffice.Services;

public interface ICryptService
{
    public string HashPassword(string password);


    public bool VerifyPassword(string password, string hashedPassword);
}