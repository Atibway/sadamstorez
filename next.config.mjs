/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "i5.walmartimages.com",
      },
      {
        protocol: "https",
        hostname:"utfs.io"
    },
      {
        protocol: "https",
        hostname:"avatars.githubusercontent.com"
    },
      {
        protocol: "https",
        hostname:"c0.wallpaperflare.com"
    },
    ],
  },
};

export default nextConfig;
