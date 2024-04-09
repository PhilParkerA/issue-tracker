/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/issues",
        destination: "/issues/list",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
