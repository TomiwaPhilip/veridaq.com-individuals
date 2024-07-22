/** @type {import('next').NextConfig} */

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
  experimental: {
    serverActions: {
      allowedOrigins: [
        "crispy-space-enigma-9r549pgr7q72p4r9-3000.app.github.dev",
        "localhost:3000",
      ],
      missingSuspenseWithCSRBailout: true,
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bdor4z6bswwyuaaj.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
});
