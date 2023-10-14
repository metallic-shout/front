/** @type {import('next').NextConfig} */

const atomObj = require("./script/atom-map");
const string2doubleStruck = require("./script/string2double-struck");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nextConfig = {
  env: {
    ATOM_OBJ: atomObj,
    PREFIX: string2doubleStruck("Punch  out  the  "),
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(graphql|gql)/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
};

// module.exports = nextConfig;
module.exports = withPWA(nextConfig);
