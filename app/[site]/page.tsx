import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { sites, siteSlugs, SITE } from "@/lib/sites";
import SiteView from "@/components/SiteView";

export function generateStaticParams() {
  return siteSlugs.map((site) => ({ site }));
}

export function generateMetadata({ params }: { params: { site: string } }): Metadata {
  const s = sites[params.site];
  if (!s) return {};
  const url = `${SITE.baseUrl}/${s.slug}`;
  const ogImg = `${SITE.baseUrl}/${s.slug}/assets/aerial_hi.png`;
  return {
    metadataBase: new URL(SITE.baseUrl),
    title: s.metaTitle,
    description: s.metaDescription,
    keywords: s.keywords,
    alternates: { canonical: url },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
    },
    openGraph: {
      type: "website", url, siteName: `${s.brand} 청주`, locale: "ko_KR",
      title: s.metaTitle, description: s.metaDescription,
      images: [{ url: ogImg, width: 1200, height: 630, type: "image/png" }],
    },
    twitter: { card: "summary_large_image", title: s.metaTitle, description: s.metaDescription, images: [ogImg] },
    verification: {
      google: SITE.googleVerify || undefined,
      other: SITE.naverVerify ? { "naver-site-verification": SITE.naverVerify } : {},
    },
  };
}

export default function Page({ params }: { params: { site: string } }) {
  const s = sites[params.site];
  if (!s) notFound();
  const url = `${SITE.baseUrl}/${s.slug}`;
  const ogImg = `${SITE.baseUrl}/${s.slug}/assets/aerial_hi.png`;

  // 구조화 데이터(JSON-LD) — 경쟁사보다 풍부하게: 조직 + 웹사이트 + 주거상품 + 브레드크럼
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": `${url}#org`, name: s.developer, url, telephone: `+82-${s.tel}` },
      { "@type": "WebSite", "@id": `${url}#website`, url, name: `${s.brand} 청주`, inLanguage: "ko-KR", publisher: { "@id": `${url}#org` } },
      {
        "@type": ["Residence", "Product"], "@id": `${url}#residence`,
        name: `${s.brand} 청주`, description: s.metaDescription, url, image: ogImg, brand: s.brand,
        address: { "@type": "PostalAddress", addressCountry: "KR", addressRegion: "충청북도", addressLocality: "청주시 흥덕구", streetAddress: s.address },
        ...(s.geo ? { geo: { "@type": "GeoCoordinates", latitude: s.geo.lat, longitude: s.geo.lng } } : {}),
        telephone: `+82-${s.tel}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE.baseUrl },
          { "@type": "ListItem", position: 2, name: `${s.brand} 청주`, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <SiteView site={s} />
    </>
  );
}
