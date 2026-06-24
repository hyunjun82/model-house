/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cloudflare Pages 정적 배포용. (폼은 functions/api/lead.ts 가 처리)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;
