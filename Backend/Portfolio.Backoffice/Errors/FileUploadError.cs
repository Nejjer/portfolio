using Ftsoft.Common.Result;

namespace Portfolio.Backoffice.Errors;


public class FileUploadError : Error
{
    public override string Type => nameof(FileUploadError);

    public static FileUploadError Instance => new();
}