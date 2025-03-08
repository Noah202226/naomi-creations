/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.fbcdn.net", // Allow all Facebook CDN subdomains
      },
    ],
  },
};

export default nextConfig;
