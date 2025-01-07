using System.Security.Claims;
using Ftsoft.Application.Cqs.Mediatr;
using Ftsoft.Common.Result;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Portfolio.Backoffice.Errors;
using Portfolio.Backoffice.Models;
using Portfolio.Backoffice.Services;
using Portfolio.Domain.Repositories;

namespace Portfolio.Backoffice.Features.User;

public class LoginCommand : Command
{
    [FromBody] public LoginDto Data { get; set; }
}

public sealed class LoginCommandHandler(
    IUserRepository userRepository,
    IHttpContextAccessor httpContextAccessor,
    ICryptService cryptService
) : CommandHandler<LoginCommand>
{
    public override async Task<Result> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var user = await userRepository.SingleOrDefaultAsync(x => x.Email == request.Data.Email, cancellationToken);
        if (user == null)
        {
            return Error(NotAuthorizedError.Instance);
        }

        var verifiedSuccessfully = cryptService.VerifyPassword(request.Data.Password, user.Password);
        if (!verifiedSuccessfully)
        {
            return Error(NotAuthorizedError.Instance);
        }

        var claims = new List<Claim>
        {
            new(ClaimTypes.Name, request.Data.Email),
            new(ClaimTypes.Role, "Manager")
        };

        var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var authProperties = new AuthenticationProperties
        {
            IsPersistent = request.Data.RememberMe
        };

        await httpContextAccessor.HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity),
            authProperties);
        return Successful();
    }
}