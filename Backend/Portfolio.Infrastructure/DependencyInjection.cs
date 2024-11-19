using Ftsoft.Storage.EntityFramework;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Domain.Repositories;
using Portfolio.Infrastructure.Storage;
using Portfolio.Infrastructure.Storage.Repositories;

namespace Portfolio.Infrastructure;

public static class DependencyInjection
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var databaseConnectionString = configuration.GetConnectionString("DefaultConnection");
        services.AddDbContext<PortfolioDbContext>(opt => { opt.UseNpgsql(databaseConnectionString); });
        RegisterRepositories(services);
    }

    private static void RegisterRepositories(IServiceCollection services)
    {
        services.RegisterRepository<IConferenceRepository, ConferenceRepository>();
        services.RegisterRepository<IEducationRepository, EducationRepository>();
        services.RegisterRepository<IPortfolioRepository, PortfolioRepository>();
        services.RegisterRepository<IPresentationRepository, PresentationRepository>();
        services.RegisterRepository<IPublicationRepository, PublicationRepository>();
        services.RegisterRepository<IWorkExperienceRepository, WorkExperienceRepository>();
    }
}