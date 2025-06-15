/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['placehold.co', 'images.unsplash.com'], // Add real domains as needed
  },
  experimental: {
    // appDir: true, // Removed due to linter error
  },
};

module.exports = nextConfig;
