using MediatR;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Features.Conference;
using Portfolio.Backoffice.Features.Portfolio;
using Portfolio.Backoffice.Features.Publications;
using Portfolio.Backoffice.Models;

namespace Portfolio.Backoffice.Controllers;

public class PublicationController(IMediator mediator) : BaseController(mediator)
{
    [HttpGet("{id:long}")]
    public async Task<ActionResult<PublicationDto>> Get(GetPublicationQuery query) =>
        await Execute(query);

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<PublicationDto>>> GetMany(GetPublicationsQuery query) =>
        await Execute(query);

    [HttpPost]
    public async Task<IActionResult> Create(CreatePublicationCommand command) =>
        await Execute(command);

    [HttpPut("{id:long}")]
    public async Task<IActionResult> Update(UpdatePublicationCommand command) =>
        await Execute(command);

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(DeletePublicationCommand command) =>
        await Execute(command);
}