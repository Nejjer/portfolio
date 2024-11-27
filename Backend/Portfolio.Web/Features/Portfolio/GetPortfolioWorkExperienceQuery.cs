using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Domain.Repositories;
using Portfolio.Web.Errors;
using Portfolio.Web.Models;

namespace Portfolio.Web.Features.Portfolio;

public class GetPortfolioWorkExperienceQuery : Query<IReadOnlyList<WorkExperienceDto>>
{
    [FromRoute] public long Id { get; set; }
}

public sealed class GetPortfolioWorkExperienceQueryHandler(
    IWorkExperienceRepository workExperienceRepository,
    IPortfolioRepository portfolioRepository)
    : QueryHandler<GetPortfolioWorkExperienceQuery, IReadOnlyList<WorkExperienceDto>>
{
    public override async Task<Result<IReadOnlyList<WorkExperienceDto>>> Handle(GetPortfolioWorkExperienceQuery request,
        CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (portfolio is null)
        {
            return Error(NotFoundError.Instance);
        }

        var workExperiences =
            await workExperienceRepository.ListAsync(x => x.PortfolioId == portfolio.Id, cancellationToken);
        var result = workExperiences.Select(x =>
            new WorkExperienceDto()
            {
                Id = x.Id,
                PortfolioId = x.PortfolioId,
                Description = x.Description,
                StartDate = x.StartDate,
            }).ToList();
        return Successful(result);
    }
}