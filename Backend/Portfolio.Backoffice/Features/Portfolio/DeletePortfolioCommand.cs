using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Backoffice.Errors;
using Portfolio.Domain.Models.Portfolio;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Portfolio;

public class DeletePortfolioCommand : Command
{
    [FromRoute] public long Id { get; set; }
}

public sealed class DeletePortfolioCommandHandler(IPortfolioRepository portfolioRepository)
    : CommandHandler<DeletePortfolioCommand>
{
    public override async Task<Result> Handle(DeletePortfolioCommand request, CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (portfolio is null)
        {
            return Error(NotFoundError.Instance);
        }

        await portfolioRepository.RemoveAsync(portfolio);
        await portfolioRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return Successful();
    }
}