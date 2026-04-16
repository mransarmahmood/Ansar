import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — builds to an /out folder that can be uploaded
  // to any static host (Hostinger shared hosting, Netlify, etc.).
  output: "export",

  // Trailing slash makes static hosts serve /about/ → /about/index.html
  // reliably. Matches Hostinger's default behavior.
  trailingSlash: true,

  // Image optimisation is a server feature — disable it for static export.
  // All <Image> usages will load the original file directly.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
