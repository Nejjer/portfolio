using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Presentation
{
    public class CreatePresentationCommand : Command
    {
        public string Title { get; set; }
        public string Event { get; set; }
        public string PresentationDate { get; set; }
        public string Description { get; set; }
        public long PortfolioId { get; set; }
        public string Link { get; set; }
    }

    public sealed class CreatePresentationCommandHandler(IPresentationRepository presentationRepository)
        : CommandHandler<CreatePresentationCommand>
    {
        public override async Task<Result> Handle(CreatePresentationCommand request,
            CancellationToken cancellationToken)
        {
            var presentation = new Domain.Models.Presentation(request.Title, request.Link, request.Event,
                request.PresentationDate, request.Description, request.PortfolioId);
            await presentationRepository.AddAsync(presentation, cancellationToken);
            await presentationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}