import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function ProfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/logowanie");
  }

  return (
    <div className="page-backdrop min-h-screen text-black">
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
            <Link
              href="/"
              className="text-sm font-medium text-black hover:opacity-70 transition-opacity duration-200"
            >
              Sklep
            </Link>
            <nav className="flex items-center gap-8">
              <Link
                href="/"
                className="text-sm text-black/70 hover:text-black transition-colors duration-200"
              >
                Strona główna
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-10 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-black">
                Profil
              </h1>
              <p className="mt-4 text-base text-black/55">
                {user.email}
              </p>
              <LogoutButton />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
