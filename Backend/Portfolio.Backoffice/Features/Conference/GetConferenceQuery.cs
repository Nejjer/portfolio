using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Conference
{
    public class GetConferenceQuery : Query<ConferenceDto>
    {
        [FromRoute] public long Id { get; set; }
    }

    public sealed class GetConferenceByIdQueryHandler(IConferenceRepository conferenceRepository)
        : QueryHandler<GetConferenceQuery, ConferenceDto>
    {
        public override async Task<Result<ConferenceDto>> Handle(GetConferenceQuery request,
            CancellationToken cancellationToken)
        {
            var conference =
                await conferenceRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (conference == null)
            {
                return Error(NotFoundError.Instance);
            }

            var result = new ConferenceDto
            {
                Id = conference.Id,
                Name = conference.Name,
                Date = conference.Date,
                PortfolioId = conference.PortfolioId
            };
            return Successful(result);
        }
    }
}