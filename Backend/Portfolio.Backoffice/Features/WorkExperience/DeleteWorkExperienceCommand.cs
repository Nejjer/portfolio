using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Portfolio.Backoffice.Errors;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.WorkExperience
{
    public class DeleteWorkExperienceCommand : Command
    {
        public long Id { get; set; }
    }

    public sealed class DeleteWorkExperienceCommandHandler(IWorkExperienceRepository workExperienceRepository)
        : CommandHandler<DeleteWorkExperienceCommand>
    {
        public override async Task<Result> Handle(DeleteWorkExperienceCommand request,
            CancellationToken cancellationToken)
        {
            var workExperience =
                await workExperienceRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (workExperience == null)
            {
                return Error(NotFoundError.Instance);
            }

            await workExperienceRepository.RemoveAsync(workExperience);
            await workExperienceRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}