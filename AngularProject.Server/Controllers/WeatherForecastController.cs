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
        public async Task<IActionResult> Post(Personel personel)
        {
            _context.Personeller.Add(personel);
            await _context.SaveChangesAsync();
            return Ok(personel);
        }
    }
}