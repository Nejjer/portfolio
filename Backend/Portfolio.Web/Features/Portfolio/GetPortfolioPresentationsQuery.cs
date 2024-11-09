using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Portfolio.Domain.Repositories;
using Portfolio.Web.Errors;
using Portfolio.Web.Models;

namespace Portfolio.Web.Features.Portfolio;

public class GetPortfolioPresentationsQuery : Query<IReadOnlyList<PresentationDto>>
{
    public long Id { get; set; }
}

public sealed class GetPortfolioPresentationsQueryHandler(
    IPresentationRepository presentationRepository,
    IPortfolioRepository portfolioRepository)
    : QueryHandler<GetPortfolioPresentationsQuery, IReadOnlyList<PresentationDto>>
{
    public override async Task<Result<IReadOnlyList<PresentationDto>>> Handle(GetPortfolioPresentationsQuery request,
        CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (portfolio is null)
        {
            return Error(NotFoundError.Instance);
        }

        var presentations =
            await presentationRepository.ListAsync(x => x.PortfolioId == portfolio.Id, cancellationToken);
        var result = presentations.Select(p =>
            new PresentationDto()
            {
                Id = p.Id,
                Title = p.Title,
                Event = p.Event,
                PresentationDate = p.PresentationDate,
                Description = p.Description,
                Link = p.Link,
                PortfolioId = p.PortfolioId
            }).ToList();
        return Successful(result);
    }
}