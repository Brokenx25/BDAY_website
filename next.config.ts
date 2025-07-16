import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  webpack: (config) => {
    // Handle audio files
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });

    // Handle image files
    config.module.rules.push({
      test: /\.(jpg|jpeg|png|webp|gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });

    // Handle GIF files specifically
    config.module.rules.push({
      test: /\.(gif)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]'
      }
    });

    // Handle markdown files
    config.module.rules.push({
      test: /\.md$/,
      type: 'asset/source'
    });

    return config;
  }
};
export default nextConfig;
