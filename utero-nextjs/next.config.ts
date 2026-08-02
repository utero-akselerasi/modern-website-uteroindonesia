import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  
  // Fix untuk static export di cPanel
  basePath: "",
  assetPrefix: "",
  trailingSlash: true,
  
  // Disable image optimization untuk static export
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
