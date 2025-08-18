/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'development' && process.env.DOCKER 
    ? 'https://syncsketch.praverbajaj.tech' 
    : undefined,
  allowedDevOrigins: ['syncsketch.praverbajaj.tech'],
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/postcss'],
      },
    },
  },
  devIndicators: false
};

export default nextConfig;
