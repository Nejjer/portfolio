using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Presentation
{
    public class UpdatePresentationCommand : Command
    {
        [FromRoute] public long Id { get; set; }
        [FromBody] public PresentationDto Data { get; set; }
    }

    public sealed class UpdatePresentationCommandHandler(IPresentationRepository presentationRepository)
        : CommandHandler<UpdatePresentationCommand>
    {
        public override async Task<Result> Handle(UpdatePresentationCommand request,
            CancellationToken cancellationToken)
        {
            var presentation =
                await presentationRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (presentation == null)
            {
                return Error(NotFoundError.Instance);
            }

            presentation.Update(request.Data.Title, request.Data.Link,
                request.Data.Description, request.Data.PortfolioId, request.Data.Image);
            await presentationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}