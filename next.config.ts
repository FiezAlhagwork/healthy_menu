import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "respsceekybuavxxiayb.supabase.co",
      },
    ],

    imageSizes: [400],
    deviceSizes: [640],
  },
  reactCompiler: true,
};

export default nextConfig;
