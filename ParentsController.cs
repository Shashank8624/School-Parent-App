using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolParentApp.Data;
using SchoolParentApp.Models;
using System.Threading.Tasks;

namespace SchoolParentApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParentsController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;
        public ParentsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;

        }

        [HttpPost]
        [Route("AddParent")]
        public async Task<IActionResult> AddParent(Parent parent)
        {
            try
            {
                long registrationId = GenerateRandomRegistrationId();
                parent.RegistrationId = registrationId;

                _dbContext.Parents.Add(parent);
                await _dbContext.SaveChangesAsync();
                return Ok(parent);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Internal server error: {ex.Message}");
            }
        }

        private long GenerateRandomRegistrationId()
        {
            Random random = new Random();
            long registrationId = ((long)random.Next(10000, 99999) * 100000) + (long)random.Next(10000, 99999);
            return registrationId;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllParents()
        {
            var parents = await _dbContext.Parents.ToListAsync();
            return Ok(parents);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> EditParent([FromRoute] int id, Parent parent)
        {

            var parents = await _dbContext.Parents.FirstOrDefaultAsync(x => x.ParentId == parent.ParentId);
            _dbContext.Entry(parents).CurrentValues.SetValues(parent);
            await _dbContext.SaveChangesAsync();

            return Ok(parent);

        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteParent([FromRoute] int id)
        {
            var parent = await _dbContext.Parents.FirstOrDefaultAsync(x => x.ParentId == id);
            _dbContext.Parents.Remove(parent);
            await _dbContext.SaveChangesAsync();

            return Ok(parent);




        }
    }
}

