using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.WorkExperience
{
    public class CreateWorkExperienceCommand : Command
    {
        [FromBody] public WorkExperienceDto Data { get; set; }
    }

    public sealed class CreateWorkExperienceCommandHandler(IWorkExperienceRepository workExperienceRepository)
        : CommandHandler<CreateWorkExperienceCommand>
    {
        public override async Task<Result> Handle(CreateWorkExperienceCommand request,
            CancellationToken cancellationToken)
        {
            var workExperience = new Domain.Models.WorkExperience(request.Data.Description,
                request.Data.StartDate, request.Data.PortfolioId);
            await workExperienceRepository.AddAsync(workExperience, cancellationToken);
            await workExperienceRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}