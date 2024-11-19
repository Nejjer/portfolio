using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Conference;

public class CreateConferenceCommand : Command
{
    [FromBody] public ConferenceDto Data { get; set; }
}

public sealed class CreateConferenceCommandHandler(IConferenceRepository conferenceRepository)
    : CommandHandler<CreateConferenceCommand>
{
    public override async Task<Result> Handle(CreateConferenceCommand request, CancellationToken cancellationToken)
    {
        var conference = new Domain.Models.Conference(request.Data.Name, request.Data.Date, request.Data.PortfolioId);
        await conferenceRepository.AddAsync(conference, cancellationToken);
        await conferenceRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return Successful();
    }
}