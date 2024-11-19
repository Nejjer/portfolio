using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Domain.Repositories;
using Portfolio.Web.Errors;
using Portfolio.Web.Models;

namespace Portfolio.Web.Features.Portfolio;

public class GetPortfolioEducationQuery : Query<IReadOnlyList<EducationDto>>
{
    [FromRoute] public int Id { get; set; }
}

public sealed class
    GetPortfolioEducationQueryHandler(
        IEducationRepository educationRepository,
        IPortfolioRepository portfolioRepository) : QueryHandler<GetPortfolioEducationQuery,
    IReadOnlyList<EducationDto>>
{
    public override async Task<Result<IReadOnlyList<EducationDto>>> Handle(GetPortfolioEducationQuery request,
        CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (portfolio is null)
        {
            return Error(NotFoundError.Instance);
        }

        var educations =
            await educationRepository.ListAsync(x => x.PortfolioId == portfolio.Id, cancellationToken);
        var result = educations.Select(x =>
            new EducationDto()
            {
                Id = x.Id,
                PortfolioId = x.PortfolioId,
                Degree = x.Degree,
                Name = x.Name,
                EndYear = x.EndYear,
                FieldOfStudy = x.FieldOfStudy,
                Institution = x.Institution,
                StartYear = x.StartYear
            }).ToList();
        return Successful(result);
    }
}