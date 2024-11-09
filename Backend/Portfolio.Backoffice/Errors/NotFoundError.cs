using Ftsoft.Common.Result;

namespace Portfolio.Backoffice.Errors;

public class NotFoundError : Error
{
    public override string Type => nameof(NotFoundError);
    public static NotFoundError Instance => new();
}