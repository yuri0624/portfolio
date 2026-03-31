import type { NextConfig } from "next";

/** GitHub Pages のプロジェクトサイトは `https://<user>.github.io/<repo>/` になるため、Actions で BASE_PATH=/<repo> を渡す */
const rawBase = process.env.BASE_PATH?.trim() || "";
const basePath = rawBase === "/" ? "" : rawBase.replace(/\/$/, "");

const nextConfig: NextConfig = {
  output: "export",
  ...(basePath ? { basePath } : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "steenz.jp",
        pathname: "/wp-content/**",
      },
      {
        protocol: "https",
        hostname: "www.glico.com",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "imgu.web.nhk",
        pathname: "/static/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
};

export default nextConfig;
