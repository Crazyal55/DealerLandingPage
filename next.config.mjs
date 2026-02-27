/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  ...(isProd && {
    basePath: '/DealerLandingPage',
    assetPrefix: '/DealerLandingPage',
  }),
  trailingSlash: true,
};

export default nextConfig;
