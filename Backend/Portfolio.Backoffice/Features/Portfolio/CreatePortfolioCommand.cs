﻿using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Models.Portfolio;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Portfolio;

public class CreatePortfolioCommand : Command
{
    [FromBody] public PortfolioDto Data { get; set; }
}

public sealed class CreatePortfolioCommandHandler(IPortfolioRepository portfolioRepository)
    : CommandHandler<CreatePortfolioCommand>
{
    public override async Task<Result> Handle(CreatePortfolioCommand request, CancellationToken cancellationToken)
    {
        var contacts = request.Data.Contacts.Select(x => new PortfolioContact(x.Name, x.Value)).ToList();
        var portfolio = new Domain.Models.Portfolio.Portfolio(request.Data.Name, request.Data.ShortInfo,
            request.Data.Slogan, contacts);
        await portfolioRepository.AddAsync(portfolio, cancellationToken);
        await portfolioRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return Successful();
    }
}