using Ftsoft.Common.Result;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Web.Features.File;
using FileResult = Portfolio.Web.Features.File.FileResult;

namespace Portfolio.Web.Controllers;

public class FilesController(IMediator mediator) : BaseController(mediator)
{
    
    [AllowAnonymous]
    [HttpGet("{name}")]
    public async Task<ActionResult> Get([FromRoute] string name)
    {
        var query = new GetFileQuery
        {
            Name = name
        };
        var result = await mediator.Send(query);
        if (result.IsSuccessfull)
        {
            var value = result.GetValue<FileResult>();
            return File(value.FileStream, "application/octet-stream", value.FileName);
        }

        var error = result.GetErrors().FirstOrDefault();
        return BadRequest(error);  
    }
}