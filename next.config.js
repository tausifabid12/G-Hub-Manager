/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  env: {
    gitHub_Access_Token: process.env.GITHUB_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
