import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
