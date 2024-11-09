using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Models.Portfolio;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Portfolio;

public class UpdatePortfolioCommand : Command
{
    [FromRoute] public long Id { get; set; }
    [FromBody] public PortfolioDto Data { get; set; }
}

public sealed class UpdatePortfolioCommandHandler(IPortfolioRepository portfolioRepository)
    : CommandHandler<UpdatePortfolioCommand>
{
    public override async Task<Result> Handle(UpdatePortfolioCommand request, CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (portfolio is null)
        {
            return Error(NotFoundError.Instance);
        }

        var contacts = request.Data.Contacts.Select(x => new PortfolioContact(x.Name, x.Value)).ToList();
        portfolio.Update(request.Data.Name, request.Data.ShortInfo, request.Data.Slogan, contacts);
        await portfolioRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return Successful();
    }
}