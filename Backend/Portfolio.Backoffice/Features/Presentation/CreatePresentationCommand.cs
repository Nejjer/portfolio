using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Presentation
{
    public class CreatePresentationCommand : Command
    {
        [FromBody] public PresentationDto Data { get; set; }
    }

    public sealed class CreatePresentationCommandHandler(IPresentationRepository presentationRepository)
        : CommandHandler<CreatePresentationCommand>
    {
        public override async Task<Result> Handle(CreatePresentationCommand request,
            CancellationToken cancellationToken)
        {
            var presentation = new Domain.Models.Presentation(request.Data.Title, request.Data.Link, request.Data.Description,
                request.Data.PortfolioId, request.Data.Image);
            await presentationRepository.AddAsync(presentation, cancellationToken);
            await presentationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}