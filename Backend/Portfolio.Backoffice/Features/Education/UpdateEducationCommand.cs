using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Education
{
    public class UpdateEducationCommand : Command
    {
        [FromRoute] public long Id { get; set; }
        [FromBody] public EducationDto Data { get; set; }
    }

    public sealed class UpdateEducationCommandHandler(IEducationRepository educationRepository)
        : CommandHandler<UpdateEducationCommand>
    {
        public override async Task<Result> Handle(UpdateEducationCommand request, CancellationToken cancellationToken)
        {
            var education = await educationRepository.SingleOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
            if (education == null)
            {
                return Error(NotFoundError.Instance);
            }

            education.Update(request.Data.Name, request.Data.Institution, request.Data.Degree, request.Data.FieldOfStudy, request.Data.StartYear,
                request.Data.EndYear, request.Data.PortfolioId);
            await educationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}