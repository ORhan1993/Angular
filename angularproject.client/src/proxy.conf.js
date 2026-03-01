const PROXY_CONFIG = [
  {
    context: ["/api"],
    target: "http://127.0.0.1:5214", // HTTPS yerine doğrudan HTTP portuna yönlendirdik
    secure: false,
    changeOrigin: true
  }
]
module.exports = PROXY_CONFIG;
