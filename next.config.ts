import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint:{
    ignoreDuringBuilds:true,
  },
  images:{
    remotePatterns:[
      {
       protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
  }
]
  }
  /* config options here */
};

export default nextConfig;
