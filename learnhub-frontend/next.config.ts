import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Required for Docker deployment
  // Enable experimental features if needed
  experimental: {
    // serverActions: true // if using server actions
  },
};

export default nextConfig;
