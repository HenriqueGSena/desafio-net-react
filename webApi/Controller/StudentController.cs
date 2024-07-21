using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webApi.Data;
using webApi.Entities;
using webApi.viewModels;
namespace webApi.Controller 
{
    [ApiController]
    public class StudentController : ControllerBase 
    {
        [HttpGet]
        [Route("/api/students")]
        public async Task<IActionResult> GetAllStudentsAsync(
            [FromServices] ApplicationDbContext context)
        {
            var students = await context
                .Students
                .AsNoTracking()
                .ToListAsync();
            return Ok(students);
        }

        [HttpGet]
        [Route("/api/students/{id}")]
        public async Task<IActionResult> GetByIdAsync(
            [FromServices] ApplicationDbContext context, 
            [FromRoute] int id)
        {
            var student = await context
                .Students
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
            return student == null ? Ok(null) : Ok(student);
        }

        [HttpPost]
        [Route("/api/students")]
        public async Task<IActionResult> PostStudentAsync(
            [FromServices] ApplicationDbContext context, 
            [FromBody] CreateStudentViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var student = new Student()
            {
                Nome = model.Nome,
                Idade = model.Idade,
                Serie = model.Serie,
                NotaMedia = model.NotaMedia,
                Endereco = model.Endereco,
                NomePai = model.NomePai,
                NomeMae = model.NomeMae,
                DataNascimento = model.DataNascimento
            };

            try
            {
                await context.Students.AddAsync(student);
                await context.SaveChangesAsync();
                return Ok(student);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("/api/students/{id}")]
        public async Task<IActionResult> PutStudentAsync(
            [FromServices] ApplicationDbContext context, 
            [FromBody] CreateStudentViewModel model, 
            [FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var student = await context
                .Students
                .FirstOrDefaultAsync(x => x.Id == id);

            if (student == null)
                return NotFound();

            try
            {
                student.Nome = model.Nome;
                student.Idade = model.Idade;
                student.Serie = model.Serie;
                student.NotaMedia = model.NotaMedia;
                student.Endereco = model.Endereco;
                student.NomePai = model.NomePai;
                student.NomeMae = model.NomeMae;
                student.DataNascimento = model.DataNascimento;

                context.Students.Update(student);
                await context.SaveChangesAsync();
                return Ok(student);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("/api/students/{id}")]
        public async Task<IActionResult> DeleteStudentAsync(
            [FromServices] ApplicationDbContext context, 
            [FromRoute] int id)
        {
            var student = await context
                .Students
                .FirstOrDefaultAsync(x => x.Id == id);

            try
            {
                context.Students.Remove(student);
                await context.SaveChangesAsync();
                return Ok(student);
            }
            catch (Exception e)
            {
                return BadRequest();
            }
        }
    }
}
