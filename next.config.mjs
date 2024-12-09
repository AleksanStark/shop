/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
        pathname: "/links/**",
      },
    ],
  },
};

export default nextConfig;
