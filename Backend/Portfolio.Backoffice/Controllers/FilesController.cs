using InsideQuest.Backoffice.Startup.Features.File;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Models;

namespace Portfolio.Backoffice.Controllers;

public class FilesController(IMediator mediator) : BaseController(mediator)
{
    [HttpPost("upload")]
    public async Task<ActionResult<UploadFileResultDto>> UploadFile([FromForm] UploadFileCommand command) =>
        await Execute<UploadFileResultDto>(command);
}