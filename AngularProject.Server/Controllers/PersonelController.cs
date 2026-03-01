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
        // --------------------------------------------------------
        // GÜNCELLEME (UPDATE) İŞLEMİ - [HttpPut]
        // Angular'dan gelen: this.http.put('/api/personel/1', personel)
        // --------------------------------------------------------
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPersonel(int id, [FromBody] Personel guncelPersonel)
        {
            // 1. Güvenlik Kontrolü: URL'den gelen ID ile formdan gelen nesnenin ID'si aynı mı?
            if (id != guncelPersonel.Id)
            {
                return BadRequest("Hata: URL'deki ID ile güncellenecek nesnenin ID'si uyuşmuyor.");
            }

            // 2. Entity Framework'e bu kaydın "Değiştirildi (Modified)" olduğunu söylüyoruz
            _context.Entry(guncelPersonel).State = EntityState.Modified;

            try
            {
                // 3. Değişiklikleri veritabanına kaydet
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Eğer o ID'ye ait bir kayıt veritabanında yoksa 404 dön
                if (!_context.Personeller.Any(e => e.Id == id))
                {
                    return NotFound("Hata: Güncellenmek istenen personel bulunamadı.");
                }
                else
                {
                    throw;
                }
            }

            // 4. İşlem başarılı. Geriye veri dönmeye gerek yok (204 No Content)
            return NoContent();
        }

        // --------------------------------------------------------
        // SİLME (DELETE) İŞLEMİ - [HttpDelete]
        // Angular'dan gelen: this.http.delete('/api/personel/1')
        // --------------------------------------------------------
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePersonel(int id)
        {
            // 1. Önce silinmek istenen personeli veritabanında bul
            var personel = await _context.Personeller.FindAsync(id);

            // 2. Eğer öyle bir personel yoksa 404 (Bulunamadı) dön
            if (personel == null)
            {
                return NotFound("Hata: Silinmek istenen personel bulunamadı.");
            }

            // 3. Personeli Entity Framework bağlamından çıkar (Silinmek üzere işaretle)
            _context.Personeller.Remove(personel);

            // 4. Değişiklikleri veritabanına yansıt
            await _context.SaveChangesAsync();

            // 5. İşlem başarılı. (204 No Content)
            return NoContent();
        }

    }
}