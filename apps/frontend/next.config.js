/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack configuration (stable)
  turbopack: {},
  
  // Cross-origin configuration for production
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ]
      }
    ];
  },
  
  // Output configuration for Vercel
  output: 'standalone',
  
  // Disable telemetry
  telemetry: false
};

export default nextConfig;