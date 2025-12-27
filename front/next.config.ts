import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Opcje konfiguracyjne */
  async rewrites() {
    return [
      {
        // Wszystkie zapytania zaczynające się od /api/ trafią do Flaska
        source: "/api/:path*",
        destination: process.env.API_URL
          ? `${process.env.API_URL}/api/:path*`
          : "http://127.0.0.1:5000/api/:path*",
      },
    ];
  },
  // Dodatkowe przydatne ustawienia:
  reactStrictMode: true
};

export default nextConfig;