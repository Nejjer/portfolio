using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Portfolio.Backoffice.Errors;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Presentation
{
    public class DeletePresentationCommand : Command
    {
        public long Id { get; set; }
    }

    public sealed class DeletePresentationCommandHandler(IPresentationRepository presentationRepository) 
        : CommandHandler<DeletePresentationCommand>
    {
        public override async Task<Result> Handle(DeletePresentationCommand request, CancellationToken cancellationToken)
        {
            var presentation = await presentationRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (presentation == null)
            {
                return Error(NotFoundError.Instance);
            }

            await presentationRepository.RemoveAsync(presentation);
            await presentationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}