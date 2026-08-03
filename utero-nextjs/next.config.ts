import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  
  basePath: "",
  assetPrefix: "",
  trailingSlash: true,
  
  images: {
    unoptimized: true,
  },
  
  allowedDevOrigins: [
    "localhost",
    "localhost:3000",
    "*.localhost",
    "*.localhost:3000",
    "*.carubra.com",
    "http://10.10.10.113:3002"
  ],
};

export default nextConfig;