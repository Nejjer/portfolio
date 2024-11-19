using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.WorkExperience;

public class GetWorkExperienceQuery : Query<WorkExperienceDto>
{
    [FromRoute] public long Id { get; set; }
}

public sealed class GetPortfolioWorkExperienceQueryHandler(
    IWorkExperienceRepository workExperienceRepository,
    IPortfolioRepository portfolioRepository)
    : QueryHandler<GetWorkExperienceQuery, WorkExperienceDto>
{
    public override async Task<Result<WorkExperienceDto>> Handle(GetWorkExperienceQuery request,
        CancellationToken cancellationToken)
    {
        var workExperience =
            await workExperienceRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (workExperience == null)
        {
            return Error(NotFoundError.Instance);
        }

        var result = new WorkExperienceDto()
        {
            Id = workExperience.Id,
            PortfolioId = workExperience.PortfolioId,
            Company = workExperience.Company,
            EndDate = workExperience.EndDate,
            StartDate = workExperience.StartDate,
            Position = workExperience.Position
        };
        return Successful(result);
    }
}