using System.Text.Json;
using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Infrastructure.Services;
using Portfolio.Infrastructure.Services.Models;

namespace InsideQuest.Backoffice.Startup.Features.File;

public class UploadFileCommand : Command
{
    public Microsoft.AspNetCore.Http.IFormFile File { get; set; }
}

public sealed class UploadFileCommandHandler
    (ILogger<UploadFileCommandHandler> logger, IStorageService storageService) : CommandHandler<UploadFileCommand>
{
    private static readonly FileType[] AllowedFileTypes =
    [
        FileType.Doc, FileType.Docx, FileType.Jpg,
        FileType.Png, FileType.Pdf, FileType.Jpeg,
        FileType.Png, FileType.Xls, FileType.Xlsx
    ];

    public override async Task<Result> Handle(UploadFileCommand request, CancellationToken cancellationToken)
    {
        logger.LogInformation(JsonSerializer.Serialize(request.File));
        var fileUrl = await storageService.SaveFileAsync(request.File, AllowedFileTypes, cancellationToken);
        return fileUrl is null
            ? Error(FileUploadError.Instance)
            : Successful(new UploadFileResultDto() { Url = fileUrl });
    }
}