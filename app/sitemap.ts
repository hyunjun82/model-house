import type { MetadataRoute } from "next";
import { siteSlugs } from "@/lib/sites";

// 배포 도메인
const BASE = "https://model-house.net";
const SECTIONS = ["news", "dev", "location", "plans"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];
  for (const slug of siteSlugs) {
    urls.push({ url: `${BASE}/${slug}`, lastModified: now, changeFrequency: "weekly", priority: 1 });
    for (const sec of SECTIONS) {
      urls.push({ url: `${BASE}/${slug}/${sec}`, lastModified: now, changeFrequency: "weekly", priority: 0.7 });
    }
  }
  // 부동산 계산기 섹션
  const CALC = ["", "acquisition-tax", "transfer-tax", "property-holding-tax", "gift-tax", "inheritance-tax", "dsr", "dti", "jeonse-monthly", "jeonse-loan", "mortgage-loan", "interim-loan", "broker-fee", "registration-cost", "stamp-tax", "prepayment-fee"];
  for (const c of CALC) {
    urls.push({ url: `${BASE}/calc/${c ? c + "/" : ""}`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  return urls;
}
