using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Conference
{
    public class DeleteConferenceCommand : Command
    {
        [FromRoute] public long Id { get; set; }
    }

    public sealed class DeleteConferenceCommandHandler(IConferenceRepository conferenceRepository)
        : CommandHandler<DeleteConferenceCommand>
    {
        public override async Task<Result> Handle(DeleteConferenceCommand request, CancellationToken cancellationToken)
        {
            var conference =
                await conferenceRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (conference == null)
            {
                return Error(NotFoundError.Instance);
            }

            await conferenceRepository.RemoveAsync(conference);
            await conferenceRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}