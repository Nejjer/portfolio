using Ftsoft.Common.Result;

namespace Portfolio.Backoffice.Errors;

public class UserAlreadyExistsError : Error
{
    public override string Type => nameof(UserAlreadyExistsError);
    public static UserAlreadyExistsError Instance => new();
}