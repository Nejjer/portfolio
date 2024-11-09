using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Education;

public class GetEducationQuery : Query<EducationDto>
{
    [FromRoute] public int Id { get; set; }
}

public sealed class
    GetPortfolioEducationQueryHandler(
        IEducationRepository educationRepository,
        IPortfolioRepository portfolioRepository) : QueryHandler<GetEducationQuery,
    EducationDto>
{
    public override async Task<Result<EducationDto>> Handle(GetEducationQuery request,
        CancellationToken cancellationToken)
    {
        var education =
            await educationRepository.SingleOrDefaultAsync(x => x.PortfolioId == request.Id, cancellationToken);
        if (education is null)
        {
            return Error(NotFoundError.Instance);
        }

        var result = new EducationDto()
        {
            Id = education.Id,
            PortfolioId = education.PortfolioId,
            Degree = education.Degree,
            Name = education.Name,
            EndYear = education.EndYear,
            FieldOfStudy = education.FieldOfStudy,
            Institution = education.Institution,
            StartYear = education.StartYear
        };
        return Successful(result);
    }
}