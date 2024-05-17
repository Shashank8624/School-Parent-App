using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolParentApp.Data;
using SchoolParentApp.Models;

namespace SchoolParentApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParentsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;
        public ParentsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;

        }


        [HttpPost]
        [Route("AddParent")]
        public async Task<IActionResult> AddParent(Parent parent)
        {

            // Generate random value with in specified range 
            long registrationId = GenerateRandomRegistrationId();
            parent.RegistrationId = registrationId;

            dbContext.Parents.Add(parent);

            await dbContext.SaveChangesAsync();
            return Ok(parent);

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
            var parents = await dbContext.Parents.ToListAsync();
            return Ok(parents);
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> EditParent([FromRoute] int id, Parent parent)
        {

            var parents = await dbContext.Parents.FirstOrDefaultAsync(x => x.ParentId == parent.ParentId);
            dbContext.Entry(parents).CurrentValues.SetValues(parent);
            await dbContext.SaveChangesAsync();

            return Ok(parent);

        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> DeleteParent([FromRoute] int id)
        {
            var parent = await dbContext.Parents.FirstOrDefaultAsync(x => x.ParentId == id);
            dbContext.Parents.Remove(parent);
            await dbContext.SaveChangesAsync();

            return Ok(parent);




        }
    }
}
