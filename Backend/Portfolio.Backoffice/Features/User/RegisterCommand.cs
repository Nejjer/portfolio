using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Backoffice.Services;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.User;

public class RegisterCommand : Command
{
    [FromBody] public RegisterDto Data { get; set; }
}
public sealed class RegisterCommandHandler(ICryptService cryptService, IUserRepository userRepository) : CommandHandler<RegisterCommand>
{
    public override async Task<Result> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var existedUser = await userRepository.SingleOrDefaultAsync(x => x.Email == request.Data.Email, cancellationToken);
        if (existedUser != null)
        {
            return Error(UserAlreadyExistsError.Instance);
        }
        
        var hashedPassword = cryptService.HashPassword(request.Data.Password);
        var user = new Domain.Models.User(request.Data.Email, hashedPassword, []);
        await userRepository.AddAsync(user, cancellationToken);
        await userRepository.UnitOfWork.SaveChangesAsync(cancellationToken);
        return Successful();

    }
}