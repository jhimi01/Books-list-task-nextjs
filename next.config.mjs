/** @type {import('next').NextConfig} */
const nextConfig = {

    images: {
      // domains: ['res.cloudinary.com'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'avatars.githubusercontent.com',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
          },
        ],
      },

};

export default nextConfig;
