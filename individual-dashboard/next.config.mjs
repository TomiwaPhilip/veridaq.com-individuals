/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          allowedOrigins: ['crispy-space-enigma-9r549pgr7q72p4r9-3000.app.github.dev', 'localhost:3000'],
        },
      },
};

export default nextConfig;
