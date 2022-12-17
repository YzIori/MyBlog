/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.GITHUB_ACTIONS ? '/MyBlog' : '',
  trailingSlash: true,
};

module.exports = nextConfig;
