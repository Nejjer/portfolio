using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;

namespace Portfolio.Backoffice.Features.WorkExperience
{
    public class GetWorkExperiencesQuery : Query<IReadOnlyList<WorkExperienceDto>>
    {
        [FromQuery, Required] public long PortfolioId { get; set; }
    }

    public sealed class GetAllWorkExperiencesQueryHandler(
        IPortfolioRepository portfolioRepository,
        IWorkExperienceRepository workExperienceRepository)
        : QueryHandler<GetWorkExperiencesQuery, IReadOnlyList<WorkExperienceDto>>
    {
        public override async Task<Result<IReadOnlyList<WorkExperienceDto>>> Handle(GetWorkExperiencesQuery request,
            CancellationToken cancellationToken)
        {
            var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.PortfolioId, cancellationToken);
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
}