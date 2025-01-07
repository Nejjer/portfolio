using Ftsoft.Common.Result;

namespace Portfolio.Backoffice.Errors;

public class NotAuthorizedError : Error
{
    public override string Type => nameof(NotAuthorizedError);
    public static NotAuthorizedError Instance => new();
}