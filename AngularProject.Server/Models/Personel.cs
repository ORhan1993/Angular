using System.ComponentModel.DataAnnotations;

namespace AngularProject.Server.Models
{
    public class Personel
    {
        [Key]
        public int Id { get; set; } // Veritabanında Identity (1,1) ise değer atamana gerek yok

        [Required(ErrorMessage = "Ad alanı zorunludur.")]
        public string Ad { get; set; }

        [Required(ErrorMessage = "Soyad alanı zorunludur.")]
        public string Soyad { get; set; }

        public string Departman { get; set; }
    }
}