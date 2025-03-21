/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com"], // Allow Clerk profile images
  },
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
};

module.exports = nextConfig;
