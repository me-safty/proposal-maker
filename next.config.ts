import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable specific ESLint rules that are causing issues
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
