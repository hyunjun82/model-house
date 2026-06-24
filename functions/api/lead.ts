// Cloudflare Pages Function: POST /api/lead
// 관심고객(리드) 수신 처리. 정적(export) 배포라 Next API 대신 이 함수가 폼을 받습니다.
//
// 여기서 할 수 있는 것:
//  1) Cloudflare D1/KV 에 저장
//  2) 카카오 알림톡/문자 발송 (Solapi/Aligo API)
//  3) 슬랙/메일 알림
// 아래는 뼈대입니다. (env 바인딩은 Cloudflare Pages 설정에서 추가)

interface Env {
  // LEADS_KV?: KVNamespace;   // KV 바인딩 예시
  // SOLAPI_KEY?: string;      // 알림톡 키 예시
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  try {
    const data = await ctx.request.json<{ site?: string; name?: string; phone?: string; type?: string }>();
    if (!data?.name || !data?.phone) {
      return new Response(JSON.stringify({ ok: false, error: "missing" }), { status: 400 });
    }
    const lead = { ...data, time: new Date().toISOString() };

    // 예시) KV 저장:
    // await ctx.env.LEADS_KV?.put(`${lead.site}:${Date.now()}`, JSON.stringify(lead));

    // 예시) 알림톡 발송: 여기서 Solapi/Aligo fetch 호출

    console.log("LEAD", lead);
    return new Response(JSON.stringify({ ok: true }), { headers: { "Content-Type": "application/json" } });
  } catch {
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
};
