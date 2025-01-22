using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Backoffice.Providers;
using Portfolio.Domain.Models.Portfolio;
using Portfolio.Domain.Repositories;
using IResult = Ftsoft.Common.Result.IResult;

namespace Portfolio.Backoffice.Features.Portfolio;

public class UpdatePortfolioCommand : Command
{
    [FromRoute] public long Id { get; set; }
    [FromBody] public PortfolioDto Data { get; set; }
}

public sealed class UpdatePortfolioCommandHandler(IUserRepository userRepository, IPortfolioRepository portfolioRepository, IUserProvider userProvider)
    : CommandHandler<UpdatePortfolioCommand>
{
    protected override async Task<IResult> CanHandle(UpdatePortfolioCommand request, CancellationToken cancellationToken)
    {
        var email = userProvider.GetUserEmail();
        var user = await userRepository.SingleOrDefaultAsync(x => x.Email == email, cancellationToken);
        if (!user.PortfolioIds.Contains(request.Id))
        {
            return Error(NotFoundError.Instance);
        }

        return Successful();
    }
    
    public override async Task<Result> Handle(UpdatePortfolioCommand request, CancellationToken cancellationToken)
    {
        var portfolio = await portfolioRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (portfolio is null)
        {
            return Error(NotFoundError.Instance);
        }

        var contacts = request.Data.Contacts.Select(x => new PortfolioContact(x.Name, x.Value)).ToList();
        portfolio.Update(request.Data.Name, request.Data.ShortInfo, request.Data.Slogan, contacts, request.Data.Credits);
        await portfolioRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return Successful();
    }
}