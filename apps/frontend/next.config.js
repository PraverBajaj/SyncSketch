/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/postcss'],
      },
    },
  },
};

export default nextConfig;
