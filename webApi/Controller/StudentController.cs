using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webApi.Data;
using webApi.Entities;
using webApi.viewModels;
namespace webApi.Controller {
    [ApiController]
    public class StudentController : ControllerBase {
        /// <summary>
        ///     Obter lista estudantes
        /// </summary>
        /// <returns>Lista Estudantes</returns>
        /// <response code="200">Sucess</response>
        [HttpGet]
        [Route("/api/students")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllStudentsAsync(
            [FromServices] ApplicationDbContext context
        )
        {
            var students = await context
                .Students
                .AsNoTracking()
                .ToListAsync();
            return Ok(students);
        }

        /// <summary>
        ///     Obter estudante Id
        /// </summary>
        /// <param name="id">Identificador do evento</param>
        /// <response code="200">Sucess</response>
        /// <response code="204">Not Content</response>
        [HttpGet]
        [Route("/api/students/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        public async Task<IActionResult> GetByIdAsync(
            [FromServices] ApplicationDbContext context,
            [FromRoute] int id
        )
        {
            var student = await context
                .Students
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);
            return student == null ? Ok(null) : Ok(student);
        }

        /// <summary>
        ///     Cadastrar novo estudante
        /// </summary>
        /// <param name="devEvent">Dados do estudante</param>
        /// <returns>Estudante recem criado</returns>
        /// <response code="201">Sucess</response>
        [HttpPost]
        [Route("/api/students")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<IActionResult> PostStudentAsync(
            [FromServices] ApplicationDbContext context,
            [FromBody] CreateStudentViewModel model
        )
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

        /// <summary>
        ///     Atualizar dados estudante
        /// </summary>
        /// <param name="id">Identificador do estudante</param>
        /// <response code="204">Sucess</response>
        /// <response code="404">Not Found</response>
        [HttpPut]
        [Route("/api/students/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> PutStudentAsync(
            [FromServices] ApplicationDbContext context,
            [FromBody] CreateStudentViewModel model,
            [FromRoute] int id
        )
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

        /// <summary>
        ///     Deletar estudante Id
        /// </summary>
        /// <param name="id">Identificador do estudante</param>
        /// <response code="204">Sucess</response>
        /// <response code="404">Not Found</response>
        [HttpDelete]
        [Route("/api/students/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteStudentAsync(
            [FromServices] ApplicationDbContext context,
            [FromRoute] int id
        )
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
