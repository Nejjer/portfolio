﻿using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Backoffice.Providers;
using Portfolio.Domain.Repositories;
using IResult = Ftsoft.Common.Result.IResult;

namespace Portfolio.Backoffice.Features.Portfolio;

public class GetPortfolioQuery : Query<PortfolioDto>
{
    [FromRoute] public long Id { get; set; }
}

public sealed class GetPortfolioQueryHandler(
    IUserProvider userProvider,
    IPortfolioRepository portfolioRepository,
    IUserRepository userRepository
)
    : QueryHandler<GetPortfolioQuery, PortfolioDto>
{
    protected override async Task<IResult> CanHandle(GetPortfolioQuery request, CancellationToken cancellationToken)
    {
        var email = userProvider.GetUserEmail();
        var user = await userRepository.SingleOrDefaultAsync(x => x.Email == email, cancellationToken);
        if (!user.PortfolioIds.Contains(request.Id))
        {
            return Error(NotFoundError.Instance);
        }

        return Successful();
    }

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
            Contacts = contacts
        };
        return Successful(result);
    }
}