using MediatR;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Web.Features;
using Portfolio.Web.Features.Portfolio;
using Portfolio.Web.Models;

namespace Portfolio.Web.Controllers;

public class PortfolioController(IMediator mediator) : BaseController(mediator)
{
    [HttpGet("{id:long}")]
    public async Task<ActionResult<PortfolioDto>> GetPortfolio(GetPortfolioQuery query) =>
        await Execute(query);

    [HttpGet("{id:long}/educations")]
    public async Task<ActionResult<IReadOnlyList<EducationDto>>> GetEducations(GetPortfolioEducationQuery query) =>
        await Execute(query);

    [HttpGet("{id:long}/presentations")]
    public async Task<ActionResult<IReadOnlyList<PresentationDto>>> GetPresentations(
        GetPortfolioPresentationsQuery query) =>
        await Execute(query);
    
    [HttpGet("{id:long}/conferences")]
    public async Task<ActionResult<IReadOnlyList<ConferenceDto>>> GetConferences(
        GetPortfolioConferencesQuery query) =>
        await Execute(query);

    [HttpGet("{id:long}/publications")]
    public async Task<ActionResult<IReadOnlyList<PublicationDto>>>
        GetPublicatons(GetPortfolioPublicationsQuery query) =>
        await Execute(query);

    [HttpGet("{id:long}/workExperience")]
    public async Task<ActionResult<IReadOnlyList<WorkExperienceDto>>> GetWorkExperience(
        GetPortfolioWorkExperienceQuery query) =>
        await Execute(query);
}