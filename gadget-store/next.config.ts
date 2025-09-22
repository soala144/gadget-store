import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com"], // ✅ allow Unsplash
  },
};
// next.config.js

module.exports = nextConfig;

export default nextConfig;
