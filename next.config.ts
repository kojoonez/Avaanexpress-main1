/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.mapbox.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config: any) => {
    config.module.rules.push({
      test: /mapbox-gl.js$/,
      use: {
        loader: 'babel-loader',
      },
    });
    return config;
  },
}

export default nextConfig;
