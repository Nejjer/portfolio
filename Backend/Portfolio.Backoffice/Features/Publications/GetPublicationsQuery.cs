using System.ComponentModel.DataAnnotations;
using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Publications;

public class GetPublicationsQuery : Query<IReadOnlyList<PublicationDto>>
{
    [FromQuery, Required] public long PortfolioId { get; set; }
}

public sealed class GetPublicationsQueryHandler(
    IPublicationRepository publicationRepository,
    IPortfolioRepository portfolioRepository)
    : QueryHandler<GetPublicationsQuery, IReadOnlyList<PublicationDto>>
{
    public override async Task<Result<IReadOnlyList<PublicationDto>>> Handle(GetPublicationsQuery request,
        CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.PortfolioId, cancellationToken);
        if (portfolio is null)
        {
            return Error(NotFoundError.Instance);
        }

        var publications = await publicationRepository.ListAsync(x => x.PortfolioId == portfolio.Id, cancellationToken);
        var publicationDtos = publications.Select(x =>
            new PublicationDto()
            {
                Id = x.Id,
                Title = x.Title,
                PublicationDate = x.PublicationDate,
                Description = x.Description,
                PortfolioId = x.PortfolioId,
                Publisher = x.Publisher
            }).ToList();
        return Successful(publicationDtos);
    }
}