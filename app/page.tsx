import { redirect } from "next/navigation";
import { siteSlugs } from "@/lib/sites";

// 루트(/) 접속 시 첫 현장으로 이동. 운영 시 원하는 현장 slug 로 변경하세요.
export default function Home() {
  redirect(`/${siteSlugs[0]}`);
}
