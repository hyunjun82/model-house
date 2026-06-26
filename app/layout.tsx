import type { Metadata } from "next";
import "./globals.css";

const OG_IMG = "https://model-house.net/cheongju-platinum/assets/aerial_hi.png";
const OG_TITLE = "청주 센트럴 더 플래티넘 분양·모델하우스 안내";
const OG_DESC =
  "청주 가경동 센트럴 더 플래티넘 견본주택 ☎1599-9433 | CTX 도보 3분 초역세권·SK하이닉스 20조·청주고속터미널 호재 | 전용 59·84㎡ 총 547세대 지상 49층, 사업계획승인 완료. 모델하우스·평면도·분양가·잔여세대·방문예약 안내.";

export const metadata: Metadata = {
  metadataBase: new URL("https://model-house.net"),
  title: OG_TITLE,
  description: OG_DESC,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "https://model-house.net/",
    siteName: "청주 센트럴 더 플래티넘",
    locale: "ko_KR",
    title: OG_TITLE,
    description: OG_DESC,
    images: [{ url: OG_IMG, secureUrl: OG_IMG, width: 1200, height: 630, type: "image/png", alt: "청주 센트럴 더 플래티넘 조감도" }],
  },
  twitter: { card: "summary_large_image", title: OG_TITLE, description: OG_DESC, images: [OG_IMG] },
  verification: {
    google: "4Zxn252Q87fbKgnmMNHrqzHMv8NVgvMCggpvf8qdsOk",
    other: { "naver-site-verification": "b3fdcb830c96113a3a0c25493dbc7baf97737027" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
