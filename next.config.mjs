/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "yqoupynehwgshtspamuf.supabase.co" },
      { hostname: "yougpvynehwgstpamuf.supabaser.co" },
      { hostname: "t1.kakaocdn.net" },
      { hostname: "k.kakaocdn.net" },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

export default nextConfig;
