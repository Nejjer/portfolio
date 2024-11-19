using System.ComponentModel.DataAnnotations;
using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Conference
{
    public class GetConferencesQuery : Query<IReadOnlyList<ConferenceDto>>
    {
        [FromQuery, Required] public long PortfolioId { get; set; }
    }

    public sealed class GetConferencesQueryHandler(IConferenceRepository conferenceRepository)
        : QueryHandler<GetConferencesQuery, IReadOnlyList<ConferenceDto>>
    {
        public override async Task<Result<IReadOnlyList<ConferenceDto>>> Handle(GetConferencesQuery request,
            CancellationToken cancellationToken)
        {
            var conferences =
                await conferenceRepository.ListAsync(x => x.PortfolioId == request.PortfolioId, cancellationToken);
            var result = conferences.Select(c => new ConferenceDto
            {
                Id = c.Id,
                Name = c.Name,
                Date = c.Date,
                PortfolioId = c.PortfolioId
            }).ToList();

            return Successful(result);
        }
    }
}