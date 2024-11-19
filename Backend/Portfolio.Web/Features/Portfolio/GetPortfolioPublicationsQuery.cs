using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Domain.Repositories;
using Portfolio.Web.Errors;
using Portfolio.Web.Models;

namespace Portfolio.Web.Features.Portfolio;

public class GetPortfolioPublicationsQuery : Query<IReadOnlyList<PublicationDto>>
{
    [FromRoute] public long Id { get; set; }
}

public sealed class GetPortfolioPublicationsQueryHandler(
    IPublicationRepository publicationRepository,
    IPortfolioRepository portfolioRepository)
    : QueryHandler<GetPortfolioPublicationsQuery, IReadOnlyList<PublicationDto>>
{
    public override async Task<Result<IReadOnlyList<PublicationDto>>> Handle(GetPortfolioPublicationsQuery request,
        CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
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