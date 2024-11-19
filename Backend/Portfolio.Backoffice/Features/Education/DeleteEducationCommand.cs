using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Portfolio.Backoffice.Errors;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Education
{
    public class DeleteEducationCommand : Command
    {
        public long Id { get; set; }
    }

    public sealed class DeleteEducationCommandHandler(IEducationRepository educationRepository) 
        : CommandHandler<DeleteEducationCommand>
    {
        public override async Task<Result> Handle(DeleteEducationCommand request, CancellationToken cancellationToken)
        {
            var education = await educationRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (education == null)
            {
                return Error(NotFoundError.Instance);
            }

            await educationRepository.RemoveAsync(education);
            await educationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}