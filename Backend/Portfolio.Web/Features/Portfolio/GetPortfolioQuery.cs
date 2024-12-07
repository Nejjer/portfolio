using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Http.HttpResults;
using Portfolio.Domain.Repositories;
using Portfolio.Web.Errors;
using Portfolio.Web.Models;

namespace Portfolio.Web.Features.Portfolio;

public class GetPortfolioQuery : Query<PortfolioDto>
{
    public long Id { get; set; }
}

public sealed class GetPortfolioQueryHandler(IPortfolioRepository portfolioRepository)
    : QueryHandler<GetPortfolioQuery, PortfolioDto>
{
    public override async Task<Result<PortfolioDto>> Handle(GetPortfolioQuery request,
        CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (portfolio is null)
        {
            return Error(NotFoundError.Instance);
        }

        var contacts = portfolio.Contacts.Select(x => new PortfolioContactDto()
        {
            Name = x.Name,
            Value = x.Value
        }).ToList();
        var result = new PortfolioDto()
        {
            Name = portfolio.Name,
            ShortInfo = portfolio.ShortInfo,
            Slogan = portfolio.Slogan,
            Contacts = contacts,
            Credits = portfolio.Credits,
        };
        return Successful(result);
    }
}