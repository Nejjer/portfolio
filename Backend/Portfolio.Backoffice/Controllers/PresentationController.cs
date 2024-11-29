using MediatR;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Features.Conference;
using Portfolio.Backoffice.Features.Presentation;
using Portfolio.Backoffice.Models;

namespace Portfolio.Backoffice.Controllers;

public class PresentationController(IMediator mediator) : BaseController(mediator)
{
    [HttpGet("{id:long}")]
    public async Task<ActionResult<PresentationDto>> Get(GetPresentationQuery query) =>
        await Execute(query);

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<PresentationDto>>> GetMany(GetPresentationsQuery query) =>
        await Execute(query);

    [HttpPost]
    public async Task<IActionResult> Create(CreatePresentationCommand command) =>
        await Execute(command);

    [HttpPut("{id:long}")]
    public async Task<IActionResult> Update(UpdatePresentationCommand command) =>
        await Execute(command);

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(DeletePresentationCommand command) =>
        await Execute(command);
}