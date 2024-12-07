using MediatR;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Features.Conference;
using Portfolio.Backoffice.Features.Presentation;
using Portfolio.Backoffice.Features.WorkExperience;
using Portfolio.Backoffice.Models;

namespace Portfolio.Backoffice.Controllers;

public class WorkExperienceController(IMediator mediator) : BaseController(mediator)
{
    [HttpGet("{id:long}")]
    public async Task<ActionResult<WorkExperienceDto>> Get(GetWorkExperienceQuery query) =>
        await Execute(query);

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<WorkExperienceDto>>> GetMany(GetWorkExperiencesQuery query) =>
        await Execute(query);

    [HttpPost]
    public async Task<IActionResult> Create(CreateWorkExperienceCommand command) =>
        await Execute(command);

    [HttpPut("{id:long}")]
    public async Task<IActionResult> Update(UpdateWorkExperienceCommand command) =>
        await Execute(command);

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(DeleteWorkExperienceCommand command) =>
        await Execute(command);
}