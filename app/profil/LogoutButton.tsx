"use client";

import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-8 inline-block rounded-full border border-black/15 bg-white/80 px-7 py-3.5 text-sm font-medium text-black shadow-sm hover:bg-white hover:border-black/25 transition-all duration-200"
    >
      Wyloguj się
    </button>
  );
}
