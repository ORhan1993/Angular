using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AngularProject.Server.Data;
using AngularProject.Server.Models;

namespace AngularProject.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonelController : ControllerBase
    {
        private readonly UygulamaDbContext _context;
        public PersonelController(UygulamaDbContext context) { _context = context; }

        [HttpGet]
        public async Task<IActionResult> Get() => Ok(await _context.Personeller.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Personel personel)
        {
            // Gelen veriyi doğrula
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Hatalı veri varsa 400 döner, 500'den kurtulursun
            }

            _context.Personeller.Add(personel);
            await _context.SaveChangesAsync();
            return Ok(personel);
        }
    }
}