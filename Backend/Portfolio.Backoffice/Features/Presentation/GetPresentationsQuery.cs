using System.ComponentModel.DataAnnotations;
using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Models;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.Presentation
{
    public class GetPresentationsQuery : Query<IReadOnlyList<PresentationDto>>
    {
        [FromQuery, Required] public long PortfolioId { get; set; }
    }

    public sealed class GetPresentationsByPortfolioQueryHandler(IPresentationRepository presentationRepository)
        : QueryHandler<GetPresentationsQuery, IReadOnlyList<PresentationDto>>
    {
        public override async Task<Result<IReadOnlyList<PresentationDto>>> Handle(GetPresentationsQuery request,
            CancellationToken cancellationToken)
        {
            var presentations =
                await presentationRepository.ListAsync(x => x.PortfolioId == request.PortfolioId, cancellationToken);
            var result = presentations.Select(p => new PresentationDto()
            {
                Id = p.Id,
                Title = p.Title,
                Description = p.Description,
                Link = p.Link,
                PortfolioId = p.PortfolioId
            }).ToList();

            return Successful(result);
        }
    }
}