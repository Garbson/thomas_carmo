/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'selcor.com.br' },
      { protocol: 'https', hostname: 'admin.dallo.com.br' },
      { protocol: 'https', hostname: 'onlifeflamengo.com.br' },
    ],
  },
};

export default nextConfig;
