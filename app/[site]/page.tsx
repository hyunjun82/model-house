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
      images: [{ url: ogImg, secureUrl: ogImg, width: 1200, height: 630, type: "image/png", alt: `${s.brand} 청주 조감도` }],
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
  const tel = `+82-${s.tel.replace(/-/g, "-")}`;
  const planNames = s.plans.map((p) => p.name).join(" · ");

  // ===== 구조화 데이터(JSON-LD) — 경쟁사를 압도하는 리치 스키마 =====
  // 조직(부동산) + 웹사이트(검색액션) + 웹페이지 + 주거단지(상품/세대/평형/승인) + 브레드크럼 + FAQ
  const ld = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "RealEstateAgent"],
        "@id": `${url}#org`,
        name: `${s.brand} 청주`,
        legalName: s.developer,
        url,
        logo: ogImg,
        image: ogImg,
        telephone: tel,
        description: s.metaDescription,
        areaServed: { "@type": "City", name: "청주시" },
        address: { "@type": "PostalAddress", addressCountry: "KR", addressRegion: "충청북도", addressLocality: "청주시 흥덕구", streetAddress: s.address },
        contactPoint: { "@type": "ContactPoint", telephone: tel, contactType: "sales", areaServed: "KR", availableLanguage: ["Korean"] },
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        url,
        name: `${s.brand} 청주`,
        inLanguage: "ko-KR",
        publisher: { "@id": `${url}#org` },
        potentialAction: {
          "@type": "SearchAction",
          target: { "@type": "EntryPoint", urlTemplate: `${SITE.baseUrl}/?s={search_term_string}` },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: s.metaTitle,
        description: s.metaDescription,
        inLanguage: "ko-KR",
        isPartOf: { "@id": `${url}#website` },
        about: { "@id": `${url}#residence` },
        primaryImageOfPage: ogImg,
        breadcrumb: { "@id": `${url}#breadcrumb` },
      },
      {
        "@type": ["ApartmentComplex", "Residence", "Product"],
        "@id": `${url}#residence`,
        name: `${s.brand} 청주`,
        description: s.metaDescription,
        url,
        image: [ogImg, `${SITE.baseUrl}/${s.slug}/assets/ctx.png`],
        brand: { "@type": "Brand", name: s.brand },
        telephone: tel,
        address: { "@type": "PostalAddress", addressCountry: "KR", addressRegion: "충청북도", addressLocality: "청주시 흥덕구", streetAddress: s.address },
        ...(s.geo ? { geo: { "@type": "GeoCoordinates", latitude: s.geo.lat, longitude: s.geo.lng } } : {}),
        numberOfAccommodationUnits: { "@type": "QuantitativeValue", value: 547 },
        accommodationCategory: "아파트 (민간임대)",
        amenityFeature: s.location.map((l) => ({ "@type": "LocationFeatureSpecification", name: l.h, value: true })),
        additionalProperty: s.pills.map((p) => ({ "@type": "PropertyValue", name: "단지 특징", value: p })),
        makesOffer: {
          "@type": "Offer",
          priceCurrency: "KRW",
          availability: "https://schema.org/InStock",
          areaServed: "KR",
          seller: { "@id": `${url}#org` },
          itemOffered: { "@type": "Product", name: `${s.brand} 청주 ${planNames}` },
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "홈", item: SITE.baseUrl },
          { "@type": "ListItem", position: 2, name: `${s.brand} 청주`, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: `${s.brand} 청주 분양 문의 전화번호는 어디인가요?`,
            acceptedAnswer: { "@type": "Answer", text: `대표문의 ${s.tel} 으로 평형·동호수·분양가·잔여세대 및 방문상담 예약을 안내받으실 수 있습니다.` },
          },
          {
            "@type": "Question",
            name: `${s.brand} 청주 위치(모델하우스)는 어디인가요?`,
            acceptedAnswer: { "@type": "Answer", text: `${s.address}에 위치하며, CTX(충청권 광역급행철도) 도보권 초역세권입니다. 견본주택 방문은 ${s.tel} 사전 예약 후 안내됩니다.` },
          },
          {
            "@type": "Question",
            name: "공급 평형과 단지 규모는 어떻게 되나요?",
            acceptedAnswer: { "@type": "Answer", text: `${planNames} 국민평형 위주로 구성되며, 지상 49층 2개 동, 총 547세대(오피스텔 포함) 규모입니다.` },
          },
          {
            "@type": "Question",
            name: "사업계획승인을 받은 단지인가요?",
            acceptedAnswer: { "@type": "Answer", text: "네. 청주시 고시 제2026-132호로 주택건설 사업계획 승인 및 도시관리계획 결정이 고시되었습니다(2026.3.13). 사업 안정성이 확보된 단지입니다." },
          },
          {
            "@type": "Question",
            name: "분양(소유) 방식인가요, 임대 방식인가요?",
            acceptedAnswer: { "@type": "Answer", text: "「민간임대주택에 관한 특별법」상 장기일반민간임대주택(10년 임대 후 분양전환)으로, 자세한 계약 조건은 모집공고 및 계약서를 확인하시기 바랍니다." },
          },
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
