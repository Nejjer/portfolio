﻿using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Ftsoft.Domain.Specification;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Backoffice.Providers;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Portfolio;

public class GetPortfoliosQuery : Query<IReadOnlyList<PortfolioDto>>
{
}

public sealed class GetPortfoliosQueryHandler(IUserRepository userRepository, IUserProvider userProvider, IPortfolioRepository portfolioRepository)
    : QueryHandler<GetPortfoliosQuery, IReadOnlyList<PortfolioDto>>
{
    public override async Task<Result<IReadOnlyList<PortfolioDto>>> Handle(GetPortfoliosQuery request,
        CancellationToken cancellationToken)
    {
        var email = userProvider.GetUserEmail();
        var user = await userRepository.SingleOrDefaultAsync(x => x.Email == email, cancellationToken);
        var portfolio = await portfolioRepository.ListAsync(x => user.PortfolioIds.Contains(x.Id), cancellationToken);
        var result = portfolio.Select(p => new PortfolioDto()
        {
            Id = p.Id,
            Name = p.Name,
            ShortInfo = p.ShortInfo,
            Slogan = p.Slogan,
            Contacts = p.Contacts.Select(x => new PortfolioContactDto()
            {
                Name = x.Name,
                Value = x.Value
            }).ToList(),
            Credits = p.Credits,
        }).ToList();
        return Successful(result);
    }
}