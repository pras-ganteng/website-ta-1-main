import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "absensholat-api-mochraiyan9864-95nj69sm.leapcell.dev",
      },
    ],
  },
};

export default nextConfig;
