using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.WorkExperience
{
    public class UpdateWorkExperienceCommand : Command
    {
        [FromRoute] public long Id { get; set; }
        [FromBody] public WorkExperienceDto Data { get; set; }
    }

    public sealed class UpdateWorkExperienceCommandHandler(IWorkExperienceRepository workExperienceRepository)
        : CommandHandler<UpdateWorkExperienceCommand>
    {
        public override async Task<Result> Handle(UpdateWorkExperienceCommand request,
            CancellationToken cancellationToken)
        {
            var workExperience =
                await workExperienceRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (workExperience == null)
            {
                return Error(NotFoundError.Instance);
            }

            workExperience.Update(request.Data.Description, request.Data.StartDate, request.Data.PortfolioId);
            await workExperienceRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}