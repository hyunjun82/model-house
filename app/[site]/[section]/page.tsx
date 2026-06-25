import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sites, siteSlugs, SITE } from "@/lib/sites";
import SiteView from "@/components/SiteView";

const SECTIONS = ["news", "dev", "location", "plans"] as const;
type Section = (typeof SECTIONS)[number];
const LABEL: Record<Section, string> = { news: "보도자료", dev: "개발호재", location: "입지", plans: "평형" };

export function generateStaticParams() {
  return siteSlugs.flatMap((site) => SECTIONS.map((section) => ({ site, section })));
}

export function generateMetadata({ params }: { params: { site: string; section: string } }): Metadata {
  const s = sites[params.site];
  const sec = params.section as Section;
  if (!s || !SECTIONS.includes(sec)) return {};
  const url = `${SITE.baseUrl}/${s.slug}/${sec}`;
  const title = `${LABEL[sec]} | ${s.brand} 청주`;
  return {
    metadataBase: new URL(SITE.baseUrl),
    title,
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: { canonical: url },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
      type: "website", url, siteName: `${s.brand} 청주`, locale: "ko_KR",
      title, description: s.metaDescription,
    },
    twitter: { card: "summary_large_image", title, description: s.metaDescription },
  };
}

export default function SectionPage({ params }: { params: { site: string; section: string } }) {
  const s = sites[params.site];
  const sec = params.section as Section;
  if (!s || !SECTIONS.includes(sec)) notFound();
  return <SiteView site={s} page={sec} />;
}
