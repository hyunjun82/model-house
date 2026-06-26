// 현장(분양 사이트) 데이터. 새 현장 추가 = 여기에 항목 하나 추가 + public/<slug>/assets 이미지 넣기.

// ===== 사이트 전역 설정 (SEO) =====
export const SITE = {
  baseUrl: "https://model-house.net", // 배포 도메인
  naverVerify: "",  // 네이버 서치어드바이저 사이트 인증 코드 (발급 후 입력)
  googleVerify: "", // 구글 서치콘솔 사이트 인증 코드 (발급 후 입력)
};

export type NewsItem = { img: string; cap?: string; wide?: boolean };
export type Site = {
  slug: string;
  brand: string;
  brandSub: string;
  kicker: string;
  h1Top: string;
  h1Gold: string;
  subLine1: string;
  subLine2Html: string;
  pills: string[];
  tel: string;
  kakaoUrl: string;
  developer: string;
  address: string;
  // SEO
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  geo?: { lat: number; lng: number };
  dev: { tag: string; title: string; body: string }[];
  location: { n: string; h: string; p: string }[];
  mapQuery: string;
  plans: { name: string; spec: string; img: string }[];
  news: NewsItem[];
};

export const sites: Record<string, Site> = {
  "cheongju-platinum": {
    slug: "cheongju-platinum",
    brand: "센트럴 더 플래티넘",
    brandSub: "CHEONGJU GAGYEONG",
    kicker: "청주 가경동 49층 프리미엄 랜드마크",
    h1Top: "CTX 충청 광역급행철도 정부 심의 통과",
    h1Gold: "청주 도심 통과 → 청주 고속터미널역 (예정)",
    subLine1: "CTX 도보 3분 초역세권, 최대 수혜 아파트",
    subLine2Html: '단지 바로 옆 실거래가 <b style="color:#f0d699;font-weight:800">8억 7천!!!</b>',
    pills: ["지상 49층 · 2개 동", "총 547세대", "전용 59·84㎡", "사업계획승인 완료"],
    tel: "1599-9433",
    kakaoUrl: "https://pf.kakao.com/_NUxmxfX",
    developer: "㈜에스스퀘어",
    address: "청주시 흥덕구 가경동 1018번지 일원",
    metaTitle: "청주 센트럴 더 플래티넘 분양가·모델하우스 안내 | 가경동 49층 (공식)",
    metaDescription:
      "청주 가경동 센트럴 더 플래티넘 견본주택 ☎1599-9433 | CTX 도보 3분 초역세권·SK하이닉스 20조·청주고속터미널 호재 | 전용 59·84㎡ 총 547세대 지상 49층, 사업계획승인 완료(청주시 고시 2026-132호) | 모델하우스·평면도·분양가·민간임대·잔여세대·방문예약 안내.",
    keywords: [
      "청주 센트럴 더 플래티넘", "센트럴 더 플래티넘 청주",
      "청주 센트럴 더 플래티넘 분양", "센트럴 더 플래티넘 분양",
      "청주 센트럴 더 플래티넘 모델하우스", "센트럴 더 플래티넘 모델하우스", "센트럴 더 플래티넘 모델 하우스",
      "청주 센트럴 더 플래티넘 견본주택",
      "청주 가경동 센트럴 더 플래티넘", "가경동 센트럴 더 플래티넘", "가경 센트럴 더 플래티넘",
      "청주 센트럴 더 플래티넘 사업승인", "센트럴 더 플래티넘 사업계획승인",
      "청주 센트럴 더 플래티넘 민간임대", "센트럴 더 플래티넘 민간임대아파트",
      "센트럴 더 플래티넘 분양가",
      "청주 아파트 분양", "청주 가경동 분양", "청주 가경동 아파트",
      "청주 모델하우스", "가경동 모델하우스", "청주 민간임대 아파트", "청주 신축 아파트",
      "청주 분양", "청주 49층 아파트", "청주 잔여세대", "CTX 청주",
    ],
    geo: { lat: 36.6298, lng: 127.4357 },
    dev: [
      { tag: "CTX 광역급행철도", title: "충청권 1시간 시대", body: "대전~세종~청주~청주공항 64.4km, GTX급 시속 180km. 2025.11 KDI 민자적격성 통과. 청주 도심 통과안에 '가경터미널' 거론." },
      { tag: "고속터미널 현대화", title: "커넥트현대 · 메가박스", body: "현대백화점 '커넥트현대' 청주 2호점, 충북 유일 메가박스 MX관 입점 추진. 쇼핑·문화·외식이 도보권에." },
      { tag: "SK하이닉스 20조", title: "100만 자족도시", body: "청주 신규 D램 생산기지 조성. 오창 방사광가속기, 800만 평 BIT 산업단지 클러스터로 탄탄한 배후수요." },
    ],
    location: [
      { n: "01", h: "광역·도심 교통", p: "1·2·3순환로, 경부·중부고속도로, KTX 오송역, 청주국제공항 약 25분." },
      { n: "02", h: "도보권 학세권", p: "반경 1km 내 초·중·고 밀집. 통학 부담 없는 우수한 교육환경." },
      { n: "03", h: "완성된 생활 인프라", p: "NC백화점·롯데마트 인접, 현대백화점·롯데아울렛 인근, 충북대병원 차량 5분." },
    ],
    mapQuery: "청주시 흥덕구 가경동 1018",
    plans: [
      { name: "전용 59㎡", spec: "방3 · 화장실2 · 가변형 설계", img: "view_p35.png" },
      { name: "전용 84㎡", spec: "방3 · 화장실2 · 드레스룸·팬트리", img: "render_p36.png" },
    ],
    news: [
      { img: "gosi.png", cap: "청주시 고시 제2026-132호 — 주택건설 사업계획 승인 및 도시관리계획 결정 (청주시장, 2026.3.13)", wide: true },
      { img: "news_ctx_p1.png", cap: "① 전략환경영향평가 (국토교통부, 2026.5)" },
      { img: "news_ctx_p3.png", cap: "② 제1장 계획의 개요 · 추진경위" },
      { img: "news_ctx_p4.png", cap: "③ 추진경위 · 사업개요 (착공 2028 / 준공 2034)" },
      { img: "news_ctx_p5.png", cap: "④ 계획노선 위치도 · 총 64.4km" },
      { img: "news_ctx_p6.png", cap: "⑤ 제2장 주민의견 수렴 · 청주시 공청회" },
      { img: "news_gongo.png", cap: "⑥ 공고문 — 국토교통부 공고 제2026-152호" },
      { img: "news_paper.png", cap: "⑦ 신문공고 — 경향신문 · 충청투데이 (2026.2.10)", wide: true },
      { img: "press_hynix_1.png", cap: "⑧ 충청북도 보도자료 — SK하이닉스 충청북도 대규모 투자 결정 (2026.1.13)" },
      { img: "press_hynix_2.png" },
      { img: "press_hynix_3.png" },
      { img: "press_ctx_1.png", cap: "⑨ 충청북도 보도자료 — CTX 청주도심통과 성과 공유 (2025.12.29)" },
      { img: "press_ctx_2.png" },
      { img: "press_ctx_3.png" },
    ],
  },
};

export const siteSlugs = Object.keys(sites);
