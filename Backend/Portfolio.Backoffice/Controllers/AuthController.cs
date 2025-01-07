using MediatR;
using Microsoft.AspNetCore.Authorization;
using Portfolio.Backoffice.Features.User;

namespace Portfolio.Backoffice.Controllers;

using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;

[AllowAnonymous]
public class AuthController(IMediator mediator) : BaseController(mediator)
{
    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginCommand command) =>
        await Execute(command);

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterCommand command) =>
        await Execute(command);

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok("Logged out");
    }
}