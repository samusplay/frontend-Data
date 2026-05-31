import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/test-results/**",
          "**/playwright-report/**",
          "**/e2e/**"
        ]
      };
    }
    return config;
  }
};

export default nextConfig;
