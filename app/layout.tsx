import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "분양 정보",
  robots: { index: true, follow: true },
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
