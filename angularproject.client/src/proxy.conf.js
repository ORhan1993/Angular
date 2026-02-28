const { env } = require('process');

// localhost kelimesini 127.0.0.1 ile değiştirerek IPv4/IPv6 uyuşmazlığını aşıyoruz
const target = env.ASPNETCORE_HTTPS_PORT ? `https://127.0.0.1:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0].replace('localhost', '127.0.0.1') : 'https://127.0.0.1:7185';

const PROXY_CONFIG = [
  {
    context: [
      "/api",
    ],
    target,
    secure: false,
    changeOrigin: true // API'ye giderken host başlığını doğru ayarlaması için eklendi
  }
]

module.exports = PROXY_CONFIG;
