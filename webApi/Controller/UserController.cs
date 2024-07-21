using Microsoft.AspNetCore.Mvc;
using webApi.Data;
using webApi.Entities;
namespace webApi.Controller 
{
    
    [ApiController]
    public class UserController : ControllerBase {

        private readonly ApplicationDbContext _context;
        
        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("/api/auth/login")]
        public ActionResult<string> Login([FromBody] UserModal login)
        {
            var user = _context.Users.SingleOrDefault(u => u.Username == login.Username && u.Password == login.Password);
            if (user == null)
            {
                return Unauthorized("Invalid credentials");
            }
            return Ok("Login successfully");
        }
    }
}
