using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Publications
{
    public class GetPublicationQuery : Query<PublicationDto>
    {
        [FromRoute] public long Id { get; set; }
    }

    public sealed class GetPublicationQueryHandler(IPublicationRepository publicationRepository)
        : QueryHandler<GetPublicationQuery, PublicationDto>
    {
        public override async Task<Result<PublicationDto>> Handle(GetPublicationQuery request,
            CancellationToken cancellationToken)
        {
            var publication =
                await publicationRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (publication == null)
            {
                return Error(NotFoundError.Instance);
            }

            var result = new PublicationDto
            {
                Id = publication.Id,
                Title = publication.Title,
                Publisher = publication.Publisher,
                PublicationDate = publication.PublicationDate,
                Description = publication.Description,
                PortfolioId = publication.PortfolioId
            };
            return Successful(result);
        }
    }
}