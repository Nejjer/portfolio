using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Providers;
using Portfolio.Domain.Models.Portfolio;
using Portfolio.Domain.Repositories;
using IResult = Ftsoft.Common.Result.IResult;

namespace Portfolio.Backoffice.Features.Portfolio;

public class DeletePortfolioCommand : Command
{
    [FromRoute] public long Id { get; set; }
}

public sealed class DeletePortfolioCommandHandler(IUserRepository userRepository, IPortfolioRepository portfolioRepository, IUserProvider userProvider)
    : CommandHandler<DeletePortfolioCommand>
{
    protected override async Task<IResult> CanHandle(DeletePortfolioCommand request, CancellationToken cancellationToken)
    {
        var email = userProvider.GetUserEmail();
        var user = await userRepository.SingleOrDefaultAsync(x => x.Email == email, cancellationToken);
        if (!user.PortfolioIds.Contains(request.Id))
        {
            return Error(NotFoundError.Instance);
        }

        return Successful();
    }

    public override async Task<Result> Handle(DeletePortfolioCommand request, CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (portfolio is null)
        {
            return Error(NotFoundError.Instance);
        }
        var portfolioId = portfolio.Id;
        await portfolioRepository.RemoveAsync(portfolio);
        await portfolioRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        
        var email = userProvider.GetUserEmail();
        var user = await userRepository.SingleOrDefaultAsync(x => x.Email == email, cancellationToken);
        user!.RemovePortfolio(portfolioId);
        await portfolioRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        
        return Successful();
    }
}