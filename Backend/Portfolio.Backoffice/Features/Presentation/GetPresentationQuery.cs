using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Presentation;

public class GetPresentationQuery : Query<PresentationDto>
{
    [FromRoute] public long Id { get; set; }
}

public sealed class GetPortfolioPresentationsQueryHandler(
    IPresentationRepository presentationRepository,
    IPortfolioRepository portfolioRepository)
    : QueryHandler<GetPresentationQuery, PresentationDto>
{
    public override async Task<Result<PresentationDto>> Handle(GetPresentationQuery request,
        CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (portfolio is null)
        {
            return Error(NotFoundError.Instance);
        }

        var presentation =
            await presentationRepository.SingleOrDefaultAsync(x => x.Id == portfolio.Id, cancellationToken);
        if (presentation is null)
        {
            return Error(NotFoundError.Instance);
        }

        var result =
            new PresentationDto()
            {
                Id = presentation.Id,
                Title = presentation.Title,
                Event = presentation.Event,
                PresentationDate = presentation.PresentationDate,
                Description = presentation.Description,
                Link = presentation.Link,
                PortfolioId = presentation.PortfolioId
            };
        return Successful(result);
    }
}