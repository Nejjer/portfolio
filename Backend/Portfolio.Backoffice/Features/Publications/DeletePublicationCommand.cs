using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Publications
{
    public class DeletePublicationCommand : Command
    {
        [FromRoute] public long Id { get; set; }
    }

    public sealed class DeletePublicationCommandHandler(IPublicationRepository publicationRepository)
        : CommandHandler<DeletePublicationCommand>
    {
        public override async Task<Result> Handle(DeletePublicationCommand request, CancellationToken cancellationToken)
        {
            var publication =
                await publicationRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (publication == null)
            {
                return Error(NotFoundError.Instance);
            }

            await publicationRepository.RemoveAsync(publication);
            await publicationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}