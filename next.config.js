/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com"], // Allow Clerk profile images
  },
};

module.exports = nextConfig;
