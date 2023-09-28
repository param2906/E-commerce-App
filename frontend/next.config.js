/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com","via.placeholder.com"], // Add "via.placeholder.com" to the array of allowed domains
  },
}
module.exports = nextConfig
