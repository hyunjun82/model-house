"use client";
import { useEffect, useRef, useState } from "react";
import type { Site } from "@/lib/sites";
import Img from "@/components/Img";

type PageKey = "home" | "dev" | "location" | "plans" | "news";

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
);
const KakaoIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7L6 21l3.6-2c.8.1 1.6.2 2.4.2 5.5 0 10-3.6 10-8s-4.5-8-10-8z" /></svg>
);

const SUBPAD = { paddingTop: 150, minHeight: "70vh" } as const;
const imgStyle = { width: "100%", borderRadius: 14, border: "1px solid var(--line2)" } as const;

function ReservationForm({ site, onSubmit, openKakao }: { site: Site; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void; openKakao: () => void }) {
  return (
    <form className="glass reveal" onSubmit={onSubmit}>
      <p className="gtag">RESERVATION</p><h3>관심고객 등록</h3>
      <p className="gp">연락처를 남기시면 평형·동호수 안내와 방문 일정을 도와드립니다.</p>
      <div className="fg"><input type="text" name="name" placeholder="성함" required /></div>
      <div className="fg"><input type="tel" name="phone" placeholder="연락처 (010-0000-0000)" required /></div>
      <div className="fg"><select name="type"><option value="미정">관심 타입 선택</option>{site.plans.map((pl) => <option key={pl.name}>{pl.name}</option>)}</select></div>
      <label className="agree"><input type="checkbox" name="agree" required /><span>개인정보 수집·이용에 동의합니다. 수집항목(성함·연락처)은 분양 상담 목적으로만 이용됩니다.</span></label>
      <button type="submit" className="submit">상담 예약 신청하기</button>
      <a className="kbtn" onClick={openKakao}><KakaoIcon />카카오톡으로 상담하기</a>
    </form>
  );
}

function ContactBox({ site }: { site: Site }) {
  return (
    <a className="contactbox" href={`tel:${site.tel}`}>
      <span className="ph"><PhoneIcon /></span>
      <span className="info"><span className="l">대표문의</span><span className="n" style={{ whiteSpace: "nowrap" }}>{site.tel}</span></span>
    </a>
  );
}

export default function SiteView({ site, page = "home" }: { site: Site; page?: PageKey }) {
  const a = (img: string) => `/${site.slug}/assets/${img}`;
  const base = `/${site.slug}`;
  const [muted, setMuted] = useState(true);
  const [ok, setOk] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const home = page === "home";

  useEffect(() => {
    const nav = document.getElementById("nav");
    const solid = () => nav?.classList.toggle("scrolled", window.scrollY > 40 || page !== "home");
    solid();
    addEventListener("scroll", solid);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${(i % 3) * 0.07}s`;
      io.observe(el);
    });
    return () => removeEventListener("scroll", solid);
  }, [page]);

  const toggleSound = () => {
    const v = videoRef.current; if (!v) return;
    v.muted = !v.muted; if (!v.muted) v.play();
    setMuted(v.muted);
  };
  const openKakao = () => {
    if (site.kakaoUrl) window.open(site.kakaoUrl, "_blank");
    else window.location.href = `tel:${site.tel}`;
  };
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget;
    const data = {
      site: site.slug,
      name: (f.elements.namedItem("name") as HTMLInputElement).value.trim(),
      phone: (f.elements.namedItem("phone") as HTMLInputElement).value.trim(),
      type: (f.elements.namedItem("type") as HTMLSelectElement).value,
    };
    if (!data.name || !data.phone) return alert("성함과 연락처를 입력해주세요.");
    if (!(f.elements.namedItem("agree") as HTMLInputElement).checked) return alert("개인정보 수집·이용에 동의해주세요.");
    try {
      await fetch("/api/lead", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    } catch {}
    f.reset(); setOk(true);
  };

  const act = (key: PageKey) => (page === key ? { color: "var(--gold)" } : undefined);

  return (
    <>
      <nav id="nav" className={home ? "" : "scrolled"}><div className="container row">
        <a className="brand" href={`${base}/`}>{site.brand}<small>{site.brandSub}</small></a>
        <div className="links">
          <a href={`${base}/news/`} style={act("news")}>보도자료</a>
          <a href={`${base}/dev/`} style={act("dev")}>개발호재</a>
          <a href={`${base}/location/`} style={act("location")}>입지</a>
          <a href={`${base}/plans/`} style={act("plans")}>평형</a>
          <a href={`${base}/#reserve`} className="navcta">방문상담 예약</a>
        </div>
      </div></nav>

      {home && (
        <header className="hero" id="reserve"><div className="container">
          <div className="hero-head reveal">
            <p className="kicker">{site.kicker}</p>
            <h1>{site.h1Top}<br /><span className="gold">{site.h1Gold}</span></h1>
            <p className="sub">{site.subLine1}<br /><span dangerouslySetInnerHTML={{ __html: site.subLine2Html }} /></p>
          </div>
          <div className="hero-grid">
            <div>
              <div className="hvideo reveal" style={{ backgroundImage: `url(${a("aerial_hi.avif")})` }}>
                <video ref={videoRef} src={a("intro.mp4")} poster={a("aerial_hi.avif")} autoPlay muted loop playsInline preload="metadata" />
                <button className="soundbtn" onClick={toggleSound} aria-label="소리 켜기">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
                    <path d="M11 5L6 9H3v6h3l5 4V5z" /><path d="M16 9.5a3.5 3.5 0 010 5M19 7a7 7 0 010 10" />
                    {muted && <line x1="2" y1="2" x2="22" y2="22" />}
                  </svg>
                  <span>{muted ? "소리 켜기" : "소리 끄기"}</span>
                </button>
                <div className="ov"><div className="vt"><b>입지 소개 영상</b><span>드론 조감 · 교통·생활권을 한눈에</span></div></div>
              </div>
              <figure className="reveal" style={{ position: "relative", marginTop: 14, borderRadius: 18, overflow: "hidden", border: "1px solid var(--line2)" }}>
                <Img src={a("ctx.png")} alt="CTX 청주역 이미지" />
                <figcaption style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "14px 18px", fontSize: 14, fontWeight: 700, color: "#fff", background: "linear-gradient(transparent,rgba(8,11,20,.88))" }}>
                  CTX 청주역 이미지 <small style={{ display: "block", fontWeight: 400, fontSize: 11.5, color: "#aab4c8", marginTop: 2 }}>※ 이해를 돕기 위해 AI로 제작된 이미지로, 실제와 다를 수 있습니다.</small>
                </figcaption>
              </figure>
              <div className="hpills reveal">{site.pills.map((p) => <span key={p}>{p}</span>)}</div>
            </div>
            <div className="hero-right">
              <ReservationForm site={site} onSubmit={submit} openKakao={openKakao} />
              <ContactBox site={site} />
            </div>
          </div>
        </div></header>
      )}

      {page === "dev" && (
        <section className="sec" id="dev" style={SUBPAD}><div className="container">
          <div className="sec-head center reveal"><p className="kicker">DEVELOPMENT</p><h2>개발호재</h2></div>
          <div style={{ display: "grid", gap: 22 }}>
            <img className="reveal" src={a("dev1.avif")} alt="개발환경 CTX 광역철도 - 정부 대전·세종·충북 광역철도 CTX 도입 결정" style={imgStyle} loading="lazy" />
            <img className="reveal" src={a("dev2.avif")} alt="개발환경 CTX 광역철도 - 충청권 1시간 시대, 2028년 착공 2034년 개통 목표" style={imgStyle} loading="lazy" />
            <img className="reveal" src={a("dev3.avif")} alt="개발환경 청주고속터미널 현대화 사업" style={imgStyle} loading="lazy" />
            <img className="reveal" src={a("dev4.avif")} alt="개발환경 SK하이닉스 투자 - 청주 신규 D램 생산기지, 20조원 이상 투자" style={imgStyle} loading="lazy" />
          </div>
        </div></section>
      )}

      {page === "location" && (
        <section className="sec" id="location" style={SUBPAD}><div className="container">
          <div className="sec-head center reveal"><p className="kicker">LOCATION</p><h2>입지환경</h2></div>
          <div style={{ display: "grid", gap: 22 }}>
            <img className="reveal" src={a("loc1.avif")} alt="입지환경 지역입지 - 경부·중부 고속도로 및 KTX오송역, 청주국제공항 광역 교통 최중심 입지" style={imgStyle} loading="lazy" />
            <img className="reveal" src={a("loc2.avif")} alt="입지환경 세부입지 - 특권이 되는 센트럴 청주의 압도적 입지" style={imgStyle} loading="lazy" />
            <img className="reveal" src={a("loc3.avif")} alt="입지환경 광역입지 - 중부권 대표 100만 자족도시, BIT 융복합 클러스터 최대 수혜지" style={imgStyle} loading="lazy" />
          </div>
        </div></section>
      )}

      {page === "plans" && (
        <section className="sec" id="plans" style={SUBPAD}><div className="container">
          <div className="sec-head reveal"><p className="kicker">UNIT PLAN</p><h2>국민평형 평면</h2><p>가장 수요가 두꺼운 평형으로 구성했습니다.</p></div>
          <div className="plans">{site.plans.map((pl) => (
            <div className="plan reveal" key={pl.name}><div className="ph"><b>{pl.name}</b><span>{pl.spec}</span></div><div className="im"><Img src={a(pl.img)} alt={`${pl.name} 평면도`} /></div></div>
          ))}</div>
        </div></section>
      )}

      {page === "news" && (
        <section className="sec" id="news" style={SUBPAD}><div className="container">
          <div className="sec-head reveal"><p className="kicker">NEWS</p><h2>보도자료</h2><p>국토교통부 · 청주시 · 충청북도 공식 자료</p></div>
          <div className="newsgrid">{site.news.map((n, i) => (
            <figure className={`reveal${n.wide ? " wide" : ""}`} key={i}><Img src={a(n.img)} alt={n.cap || "보도자료"} />{n.cap && <figcaption>{n.cap}</figcaption>}</figure>
          ))}</div>
          <p className="newsnote reveal">※ 출처: 국토교통부·청주시·충청북도 공식 공고/보도자료. 노선·역 위치·일정은 협의 및 인허가 진행에 따라 변경될 수 있습니다.</p>
        </div></section>
      )}

      {!home && (
        <section className="sec alt" id="reserve"><div className="container">
          <div className="sec-head center reveal"><p className="kicker">RESERVATION</p><h2>방문상담 예약</h2><p>아래에 연락처를 남기시면 평형·동호수 안내와 방문 일정을 도와드립니다.</p></div>
          <div style={{ maxWidth: 460, margin: "0 auto" }}>
            <ReservationForm site={site} onSubmit={submit} openKakao={openKakao} />
            <ContactBox site={site} />
          </div>
        </div></section>
      )}

      <footer><div className="container">
        <div className="ft">
          <div className="fb">{site.brand} 청주<small>{site.brandSub}</small></div>
          <div className="info"><b style={{ color: "#cdd6e8" }}>사업주체</b> {site.developer} · <b style={{ color: "#cdd6e8" }}>분양 문의</b> {site.tel}<br />{site.address}</div>
        </div>
        <div className="disc">
          ※ 본 단지는 「민간임대주택에 관한 특별법」상 장기일반민간임대주택(10년 임대 후 분양전환)으로, 일반 분양(즉시 소유권 취득)과 계약 방식이 다릅니다. 자세한 조건은 모집공고 및 계약서를 반드시 확인하시기 바랍니다.<br />
          ※ 조감도·평면도·CTX 노선 등은 소비자 이해를 돕기 위한 자료로 실제와 차이가 있을 수 있으며, 수치·일정은 인허가 및 사업 진행에 따라 변경될 수 있습니다.
        </div>
      </div></footer>

      <div className="fab">
        <a className="call" href={`tel:${site.tel}`}><PhoneIcon /></a>
        <a className="kakao" onClick={openKakao}><KakaoIcon /></a>
      </div>

      <div className={`modal${ok ? " on" : ""}`}><div className="mc">
        <h3>접수되었습니다</h3><p>남겨주신 연락처로 담당자가<br />순차적으로 연락드리겠습니다.</p>
        <button onClick={() => setOk(false)}>확인</button>
      </div></div>
    </>
  );
}
