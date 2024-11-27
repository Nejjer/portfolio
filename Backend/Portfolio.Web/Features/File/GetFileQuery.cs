using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Infrastructure.Services;

namespace Portfolio.Web.Features.File;

public class FileResult
{
    public FileStream FileStream { get; set; }
    public string FileName { get; set; }
}

public class GetFileQuery : Query<FileResult>
{
    [FromRoute] public string Name { get; set; }
}

public sealed class GetFileQueryHandler(IStorageService storageService) : QueryHandler<GetFileQuery, FileResult>
{
    public override async Task<Result<FileResult>> Handle(GetFileQuery request, CancellationToken cancellationToken)
    {
        var filePath = storageService.GetFileFullPath(request.Name);
        var fileStream = new FileStream(filePath, FileMode.Open);
        var result = new FileResult()
        {
            FileStream = fileStream,
            FileName = request.Name
        };
        return Successful(result);
    }
}