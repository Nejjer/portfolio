using MediatR;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Features.Portfolio;
using Portfolio.Backoffice.Models;

namespace Portfolio.Backoffice.Controllers;

public class PortfolioController(IMediator mediator) : BaseController(mediator)
{
    [HttpGet("{id:long}")]
    public async Task<ActionResult<PortfolioDto>> Get(GetPortfolioQuery query) =>
        await Execute(query);

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<PortfolioDto>>> GetMany(GetPortfoliosQuery query) =>
        await Execute(query);

    [HttpPost]
    public async Task<IActionResult> Create(CreatePortfolioCommand command) =>
        await Execute(command);

    [HttpPut("{id:long}")]
    public async Task<IActionResult> Update(UpdatePortfolioCommand command) =>
        await Execute(command);

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(DeletePortfolioCommand command) =>
        await Execute(command);
}