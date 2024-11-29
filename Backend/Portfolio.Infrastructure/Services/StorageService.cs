using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Portfolio.Infrastructure.Options;
using Portfolio.Infrastructure.Services.Models;

namespace Portfolio.Infrastructure.Services;

public class StorageService(IOptions<WebSiteOptions> options, ILogger<StorageService> logger) : IStorageService
{
     private static readonly string UserFolderPath = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
     // Создаем путь к целевой папке, например, Documents
     private string BasePath = Path.Combine(UserFolderPath, "Documents", "Portfolio");

    public string GetFileFullPath(string fileName)
    {
        var fullPath = Path.Combine(BasePath, fileName);
        return fullPath;
    }
    
    public async Task<string?> SaveFileAsync(IFormFile file, IEnumerable<FileType> allowedTypes, CancellationToken cancellationToken)
    {
        var isSupported = EndsWith(file, allowedTypes.Select(ConvertFileType).ToArray());
        if (!isSupported)
        {
            logger.LogError("Попытка сохранить файл неподдерживаемого типа");
            return null;
        }
    
        if (file.Length > 31_457_280)
        {
            logger.LogError("Размер файла слишком большой");
            return null;
        }
        var postfix = Guid.NewGuid();
        var path = BasePath;
        path = Path.Combine(path);
        Directory.CreateDirectory(path);            
        var fileName = GenerateFileName(file.FileName, postfix.ToString());
        var fullPath = Path.Combine(path, fileName);
        await using var fileStream = new FileStream(fullPath, FileMode.Create);
        await file.CopyToAsync(fileStream, cancellationToken);
        fileStream.Close();
        var url = $"{options.Value.SiteUrl}/api/files/{fileName}";
        return url;
    }
    
    private string ConvertFileType(FileType type) 
    {
        return type switch
        {
            FileType.Jpg => ".jpg",
            FileType.Jpeg => ".jpeg",
            FileType.Png => ".png",
            FileType.Pdf => ".pdf",
            FileType.Doc => ".doc",
            FileType.Docx => ".docx",
            FileType.Xls => ".xls",
            FileType.Xlsx => ".xlsx",
            FileType.Pptx => ".pptx",
            _ => throw new ArgumentOutOfRangeException(),
        };
    }
    
    private static bool EndsWith(IFormFile file, string[] allowedFormats)
    {
        return allowedFormats.Any(f => file.FileName.EndsWith(f));
    }

    private static string GenerateFileName(string fileName, string postfix)
    {
        var fileNameCorrect = fileName.Replace(" ", "_");
        var name = Path.GetFileNameWithoutExtension(fileNameCorrect);
        var extension = Path.GetExtension(fileNameCorrect);
        var newName = string.Concat(name + postfix, ".", Guid.NewGuid().ToString(), extension);
        return newName;
    }
}