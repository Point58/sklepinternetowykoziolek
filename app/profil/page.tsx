import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import Link from "next/link";
import ProfileDropdown from "@/app/components/ProfileDropdown";
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
    <div className="page-backdrop page-home-dark min-h-screen text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
            <Link
              href="/"
              className="text-sm font-medium text-white/90 hover:text-white transition-opacity duration-200"
            >
              Sklep
            </Link>
            <nav className="flex items-center gap-8">
              <Link
                href="/"
                className="text-sm text-white/70 hover:text-white transition-colors duration-200"
              >
                Strona główna
              </Link>
              <ProfileDropdown user={user} />
            </nav>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm sm:p-10 text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-white">
                Profil
              </h1>
              <p className="mt-4 text-base text-white/60">
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
