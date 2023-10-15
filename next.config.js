/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    IMG_URL: process.env.IMG_URL,
    IMG_KEY: process.env.IMG_KEY,
  },
  images: {
    domains: [""],
  },
};

module.exports = nextConfig;
