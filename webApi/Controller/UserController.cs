using Microsoft.AspNetCore.Mvc;
using webApi.Entities;
using webApi.Service;
using webApi.viewModels;
namespace webApi.Controller {
    [ApiController]
    public class UserController : ControllerBase {
        /// <summary>
        ///     Login gerador de token
        /// </summary>
        /// <returns>Token de acesso</returns>
        /// <response code="200">Sucess</response>
        [HttpPost]
        [Route("/api/auth/login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> Login([FromBody] CreateUserViewModel model)
        {
            if (model.Username == "admin" && model.Password == "admin")
            {
                object token = TokenService.GenerateToken(new User());
                return Ok(token);
            }

            return BadRequest("usuario ou senha invalido");
        }
    }
}
