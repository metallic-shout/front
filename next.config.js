/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: "/:locale(ja|en)",
        destination: "/:locale/shout",
        permanent: true,
      },
    ];
  },
};

// module.exports = nextConfig;
module.exports = withPWA(nextConfig);
