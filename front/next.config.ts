import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.API_URL
          ? `${process.env.API_URL}/api/:path*`
          : "http://127.0.0.1:5000/api/:path*",
      },
    ];
  },
  reactStrictMode: true
};

export default nextConfig;