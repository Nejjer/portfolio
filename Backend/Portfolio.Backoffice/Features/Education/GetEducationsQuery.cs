using System.ComponentModel.DataAnnotations;
using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Education
{
    public class GetEducationsQuery : Query<IReadOnlyList<EducationDto>>
    {
        [FromQuery, Required] public long PortfolioId { get; set; }
    }

    public sealed class GetEducationsByPortfolioQueryHandler(IEducationRepository educationRepository)
        : QueryHandler<GetEducationsQuery, IReadOnlyList<EducationDto>>
    {
        public override async Task<Result<IReadOnlyList<EducationDto>>> Handle(GetEducationsQuery request,
            CancellationToken cancellationToken)
        {
            var educations = await educationRepository.ListAsync(x => x.PortfolioId == request.PortfolioId, cancellationToken);
            var result = educations.Select(e => new EducationDto
            {
                Id = e.Id,
                Name = e.Name,
                Institution = e.Institution,
                Degree = e.Degree,
                FieldOfStudy = e.FieldOfStudy,
                StartYear = e.StartYear,
                EndYear = e.EndYear,
                PortfolioId = e.PortfolioId
            }).ToList();

            return Successful(result);
        }
    }
}