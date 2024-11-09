using MediatR;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Features.Conference;
using Portfolio.Backoffice.Features.Education;
using Portfolio.Backoffice.Models;

namespace Portfolio.Backoffice.Controllers;

public class EducationController(IMediator mediator) : BaseController(mediator)
{
    [HttpGet("{id:long}")]
    public async Task<ActionResult<EducationDto>> Get(GetEducationQuery query) =>
        await Execute(query);

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<EducationDto>>> GetMany(GetEducationsQuery query) =>
        await Execute(query);

    [HttpPost]
    public async Task<IActionResult> Create(CreateEducationCommand command) =>
        await Execute(command);

    [HttpPut("{id:long}")]
    public async Task<IActionResult> Update(UpdateEducationCommand command) =>
        await Execute(command);

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(DeleteEducationCommand command) =>
        await Execute(command);
}