using AngularProject.Server.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// Eski çalışan SQL Server bağlantını geri getirdik
builder.Services.AddDbContext<UygulamaDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.WithOrigins("http://localhost:4200", "https://127.0.0.1:4200").AllowAnyMethod().AllowAnyHeader());
});

// 1. EKLENECEK KISIM: CORS Servisini tanımlıyoruz (builder.Build() satırından ÖNCE olmalı)
builder.Services.AddCors(options =>
{
    // Geliştirme aşamasında olduğumuz için her porttan, her metoda (GET, POST, PUT, DELETE) izin veren esnek bir kural yazıyoruz.
    options.AddPolicy("AngularIcinIzinVer",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

app.UseCors("AllowAngular");
app.UseCors("AngularIcinIzinVer");
app.UseHttpsRedirection();
app.MapControllers();
app.MapFallbackToFile("/index.html");
app.Run();