/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          allowedOrigins: ['crispy-space-enigma-9r549pgr7q72p4r9-3001.app.github.dev', 'localhost:3001'],
          missingSuspenseWithCSRBailout: true,
        },
      },
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'bdor4z6bswwyuaaj.public.blob.vercel-storage.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
