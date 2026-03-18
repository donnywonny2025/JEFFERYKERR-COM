import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint errors during build for deployment
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript errors during build for deployment
  typescript: {
    ignoreBuildErrors: true,
  },
  // Additional deployment optimizations
  images: {
    unoptimized: true, // Required for static export
  },
  // Disable React Strict Mode in development to avoid double effect runs
  // that can cause brief unmount/remount flicker on first load
  reactStrictMode: false,
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here if required
  },
};

export default nextConfig;
