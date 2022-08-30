/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost:3000', 'm.media-amazon.com', 'img-cdn.magiceden.dev'],
  },
}

module.exports = nextConfig
