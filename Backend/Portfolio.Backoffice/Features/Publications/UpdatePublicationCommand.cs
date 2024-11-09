using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Publications
{
    public class UpdatePublicationCommand : Command
    {
        [FromRoute] public long Id { get; set; }
        [FromBody] public PublicationDto Data { get; set; }
    }

    public sealed class UpdatePublicationCommandHandler(IPublicationRepository publicationRepository)
        : CommandHandler<UpdatePublicationCommand>
    {
        public override async Task<Result> Handle(UpdatePublicationCommand request, CancellationToken cancellationToken)
        {
            var publication =
                await publicationRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (publication == null)
            {
                return Error(NotFoundError.Instance);
            }

            publication.Update(request.Data.Title, request.Data.Publisher, request.Data.PublicationDate,
                request.Data.Description,
                request.Data.PortfolioId);
            await publicationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}