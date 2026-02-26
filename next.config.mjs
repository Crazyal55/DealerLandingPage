/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/DealerLandingPage',
  assetPrefix: '/DealerLandingPage',
  trailingSlash: true,
};

export default nextConfig;
