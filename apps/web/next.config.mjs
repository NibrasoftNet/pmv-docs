/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  transpilePackages: ['@workspace/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'minio-api.nibrasoft.com',
      },
      {
        protocol: 'https',
        hostname: 'pmv-docs.nibrasoft.com',
      },
      {
        protocol: 'http',
        hostname: '147.79.117.125',
        port: '4010',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4010',
      },
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
    ],
  },
};

export default nextConfig;
