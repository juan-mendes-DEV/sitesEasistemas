import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      // Tailwind v4 no pipeline do Turbopack. Os `*.module.css` ficam FORA
      // desta regra: com `as: "*.css"` global o Turbopack tratava o CSS
      // Module como CSS global, os seletores saíam sem hash e o import
      // padrão (`styles.classe`) virava `undefined` em produção. Excluídos
      // aqui, caem no tratamento nativo de CSS Modules por convenção.
      "*.css": {
        condition: { not: { path: /\.module\.css$/ } },
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
