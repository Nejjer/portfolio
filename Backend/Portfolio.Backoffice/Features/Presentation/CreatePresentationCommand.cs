using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Presentation
{
    public class CreatePresentationCommand : Command
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public long PortfolioId { get; set; }
        public string Link { get; set; }
        public string Image { get; set; }
    }

    public sealed class CreatePresentationCommandHandler(IPresentationRepository presentationRepository)
        : CommandHandler<CreatePresentationCommand>
    {
        public override async Task<Result> Handle(CreatePresentationCommand request,
            CancellationToken cancellationToken)
        {
            var presentation = new Domain.Models.Presentation(request.Title, request.Link, request.Description,
                request.PortfolioId, request.Image);
            await presentationRepository.AddAsync(presentation, cancellationToken);
            await presentationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}