using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Portfolio.Backoffice.Errors;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Presentation
{
    public class UpdatePresentationCommand : Command
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Link { get; set; }
        public string Event { get; set; }
        public string PresentationDate { get; set; }
        public string Description { get; set; }
        public long PortfolioId { get; set; }
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

            presentation.Update(request.Title, request.Link, request.Event, request.PresentationDate,
                request.Description, request.PortfolioId);
            await presentationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}