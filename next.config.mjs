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
    {
      protocol: "https",
      hostname: "images.unsplash.com",
    },
    ],
    // Next.js 16: minimumCacheTTL default changed from 60s to 4 hours
    // Keeping at 60s for now to maintain previous behavior
    minimumCacheTTL: 60,
    // Next.js 16: imageSizes default removed 16
    // Adding it back if needed for 16px images
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Next.js 16: qualities default changed to [75]
    // Supporting multiple quality levels
    qualities: [50, 75, 100],
  },
};

export default nextConfig;
