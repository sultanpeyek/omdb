/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost:3000', 'm.media-amazon.com', 'img-cdn.magiceden.dev'],
  },
  webpack: (config, _options) => {
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx']
    return config
  },
}

module.exports = nextConfig
