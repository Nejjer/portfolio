using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Education
{
    public class CreateEducationCommand : Command
    {
        [FromBody] public EducationDto Data { get; set; }
    }

    public sealed class CreateEducationCommandHandler(IEducationRepository educationRepository)
        : CommandHandler<CreateEducationCommand>
    {
        public override async Task<Result> Handle(CreateEducationCommand request, CancellationToken cancellationToken)
        {
            var education = new Domain.Models.Education(request.Data.Name, request.Data.EndYear, request.Data.StartYear,
                request.Data.FieldOfStudy, request.Data.Degree, request.Data.Institution, request.Data.PortfolioId);
            await educationRepository.AddAsync(education, cancellationToken);
            await educationRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
            return Successful();
        }
    }
}