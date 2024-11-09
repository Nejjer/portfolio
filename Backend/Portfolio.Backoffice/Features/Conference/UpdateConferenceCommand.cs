using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Conference
{
    public class UpdateConferenceCommand : Command
    {
        [FromRoute] public long Id { get; set; }
        [FromBody] public ConferenceDto Data { get; set; }
    }

    public sealed class UpdateConferenceCommandHandler(IConferenceRepository conferenceRepository)
        : CommandHandler<UpdateConferenceCommand>
    {
        public override async Task<Result> Handle(UpdateConferenceCommand request, CancellationToken cancellationToken)
        {
            var conference =
                await conferenceRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (conference == null)
            {
                return Error(NotFoundError.Instance);
            }

            conference.Update(request.Data.Name, request.Data.Date, request.Data.PortfolioId);
            await conferenceRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}