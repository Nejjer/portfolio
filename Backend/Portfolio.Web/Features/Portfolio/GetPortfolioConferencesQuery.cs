using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Domain.Repositories;
using Portfolio.Web.Errors;
using Portfolio.Web.Models;

namespace Portfolio.Web.Features.Portfolio;

public class GetPortfolioConferencesQuery : Query<IReadOnlyList<ConferenceDto>>
{
    [FromRoute] public int Id { get; set; }
}

public sealed class
    GetPortfolioConferencesQueryHandler(
        IConferenceRepository conferenceRepository,
        IPortfolioRepository portfolioRepository) : QueryHandler<GetPortfolioConferencesQuery,
    IReadOnlyList<ConferenceDto>>
{
    public override async Task<Result<IReadOnlyList<ConferenceDto>>> Handle(GetPortfolioConferencesQuery request,
        CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (portfolio is null)
        {
            return Error(NotFoundError.Instance);
        }

        var educations =
            await conferenceRepository.ListAsync(x => x.PortfolioId == portfolio.Id, cancellationToken);
        var result = educations.Select(x =>
            new ConferenceDto()
            {
                Id = x.Id,
                PortfolioId = x.PortfolioId,
                Name = x.Name,
                Date = x.Date,
                Image = x.Image,
            }).ToList();
        return Successful(result);
    }
}