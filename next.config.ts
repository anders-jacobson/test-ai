import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["placehold.co"], // Add real domains as needed
  },
  experimental: {
    // appDir: true, // Removed due to linter error
  },
};

export default nextConfig;
