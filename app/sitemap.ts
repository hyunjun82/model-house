import type { MetadataRoute } from "next";
import { siteSlugs } from "@/lib/sites";

// 배포 도메인으로 변경하세요.
const BASE = "https://model-house.net";

export default function sitemap(): MetadataRoute.Sitemap {
  return siteSlugs.map((slug) => ({
    url: `${BASE}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 1,
  }));
}
