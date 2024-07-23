using Microsoft.AspNetCore.Mvc;
using webApi.Entities;
using webApi.Service;
namespace webApi.Controller {
    [ApiController]
    public class UserController : ControllerBase {
        [HttpPost]
        [Route("/api/auth/login")]
        public IActionResult Login(string username, string password)
        {
            if (username == "admin" && password == "password")
            {
                object token = TokenService.GenerateToken(new User());
                return Ok(token);
            }

            return BadRequest("usuario ou senha invalido");
        }
    }
}
