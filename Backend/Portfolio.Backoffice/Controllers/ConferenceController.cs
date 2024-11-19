using MediatR;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Features.Conference;
using Portfolio.Backoffice.Features.Portfolio;
using Portfolio.Backoffice.Models;

namespace Portfolio.Backoffice.Controllers;

public class ConferenceController(IMediator mediator) : BaseController(mediator)
{
    [HttpGet("{id:long}")]
    public async Task<ActionResult<ConferenceDto>> Get(GetConferenceQuery query) =>
        await Execute(query);

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<ConferenceDto>>> GetMany(GetConferencesQuery query) =>
        await Execute(query);

    [HttpPost]
    public async Task<IActionResult> Create(CreateConferenceCommand command) =>
        await Execute(command);

    [HttpPut("{id:long}")]
    public async Task<IActionResult> Update(UpdateConferenceCommand command) =>
        await Execute(command);

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(DeleteConferenceCommand command) =>
        await Execute(command);
}