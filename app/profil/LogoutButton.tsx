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
      className="mt-8 inline-block rounded-full border border-white/20 bg-white/10 px-7 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-white/20 hover:border-white/30 transition-all duration-200"
    >
      Wyloguj się
    </button>
  );
}
