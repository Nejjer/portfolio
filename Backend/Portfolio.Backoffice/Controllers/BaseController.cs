﻿using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Portfolio.Backoffice.Controllers;

[Authorize]
[Route("backoffice/api/[controller]")]
public class BaseController(IMediator mediator) : Controller
{
    private CancellationToken CancellationToken => HttpContext.RequestAborted;

    protected async Task<ActionResult<T>> Execute<T>(Query<T> query)
    {
        var result = await mediator.Send(query, CancellationToken);
        if (!result.IsSuccessfull)
        {
            return BadRequest(result.GetErrors().First());
        }

        return Ok(result.GetValue<T>());
    }

    protected async Task<IActionResult> Execute(Command command)
    {
        var result = await mediator.Send(command, CancellationToken);
        if (!result.IsSuccessfull)
        {
            return BadRequest(result.GetErrors().First());
        }

        return Ok();
    }

    protected async Task<ActionResult<T>> Execute<T>(Command command)
    {
        var result = await mediator.Send(command, CancellationToken);
        if (!result.IsSuccessfull)
        {
            return BadRequest(result.GetErrors().First());
        }

        return Ok(result.GetValue<T>());
    }
}