using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Publications
{
    public class CreatePublicationCommand : Command
    {
        [FromBody] public PublicationDto Data { get; set; }
    }

    public sealed class CreatePublicationCommandHandler(IPublicationRepository publicationRepository)
        : CommandHandler<CreatePublicationCommand>
    {
        public override async Task<Result> Handle(CreatePublicationCommand request, CancellationToken cancellationToken)
        {
            var publication = new Domain.Models.Publication(request.Data.Title, request.Data.Description, request.Data.PublicationDate,
                request.Data.Publisher, request.Data.PortfolioId);
            await publicationRepository.AddAsync(publication, cancellationToken);
            await publicationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}