using Microsoft.AspNetCore.Http;
using Portfolio.Infrastructure.Services.Models;

namespace Portfolio.Infrastructure.Services;

public interface IStorageService
{
    public Task<string?> SaveFileAsync(IFormFile file, IEnumerable<FileType> allowedTypes,
        CancellationToken cancellationToken);

    public string GetFileFullPath(string fileName);
}