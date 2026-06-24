# model-house — 분양 사이트 (Next.js)

범용 도메인 하나(`model-house.net`)로 여러 분양 현장을 운영하는 구조.
현장 = 경로(subdirectory). 예) `model-house.net/cheongju-platinum`

## 폴더 구조
```
app/
  layout.tsx          # 공통 레이아웃 + 폰트
  page.tsx            # 루트(/) → 첫 현장으로 이동
  [site]/page.tsx     # 현장 페이지(동적 라우트) + SEO(generateMetadata) + JSON-LD
  sitemap.ts          # sitemap.xml 자동 생성
  globals.css         # 전체 스타일
components/
  SiteView.tsx        # 화면(영상/폼/섹션/보도자료) + 인터랙션
lib/
  sites.ts            # ★ 현장 데이터 (여기만 고치면 됨)
functions/
  api/lead.ts         # 관심고객 폼 수신 (Cloudflare Pages Function)
public/
  cheongju-platinum/assets/   # 현장 이미지·영상
```

## 로컬 실행
```bash
npm install
npm run dev
```
→ 브라우저에서 **http://localhost:3000/cheongju-platinum**

## 새 현장 추가 (예: 오송 OO)
1. `public/osong-oo/assets/` 폴더에 이미지·영상 넣기
2. `lib/sites.ts` 에 `"osong-oo": { ... }` 항목 추가 (cheongju-platinum 복사해서 내용만 교체)
3. 끝 → `model-house.net/osong-oo` 자동 생성. **도메인 점수는 그대로 유지됨.**

## 배포 (Cloudflare Pages)
1. 이 폴더를 GitHub 레포에 push
2. Cloudflare → Workers & Pages → Pages → "Connect to Git"
3. 빌드 설정:
   - Build command: `npm run build`
   - Build output directory: `out`
4. 배포 후 Pages 프로젝트에 커스텀 도메인 `model-house.net` 연결
   (가비아에서 산 도메인의 네임서버를 Cloudflare 로 변경하거나, Cloudflare에 사이트 추가 후 DNS 연결)

> 정적(export) 빌드라 폼은 `functions/api/lead.ts`(Pages Function)가 받습니다.
> KV/D1 저장·알림톡 발송은 그 파일에 추가하고 Pages > Settings > Functions 에서 바인딩하세요.

## 받아야 할 것 (의뢰인)
- 카카오 채널 URL → `lib/sites.ts` 의 `kakaoUrl`
- 확정 대표번호 → `tel`
- (선택) 고화질 조감도/평면 원본

## 영상 소리
영상은 브라우저 정책상 **음소거 자동재생**으로 시작합니다.
우측 상단 "소리 켜기" 버튼을 누르면 소리가 납니다. (정상 동작)
