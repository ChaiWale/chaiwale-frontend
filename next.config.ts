import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hwbdyuupfobpznfroapa.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.chaiwale.co.in',
          },
        ],
        destination: 'https://chaiwale.co.in/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
