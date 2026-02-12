import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { isAdmin } from "@/app/lib/supabase/roles";
import Link from "next/link";
import ProfileDropdown from "@/app/components/ProfileDropdown";
import AddProductForm from "./AddProductForm";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/logowanie");
  }

  const admin = await isAdmin(user.id);
  if (!admin) {
    redirect("/");
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
                Strona glowna
              </Link>
              <ProfileDropdown user={{ ...user, isAdmin: true }} />
            </nav>
          </div>
        </header>

        <main className="flex-1 px-6 py-16">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Panel admina
            </h1>
            <p className="mt-2 text-sm text-white/50">
              Dostep tylko dla uprawnionych uzytkownikow.
            </p>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Karta: Uzytkownicy */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M20 21a8 8 0 1 0-16 0" />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-medium text-white">Uzytkownicy</p>
                <p className="mt-1 text-xs text-white/40">Zarzadzaj kontami uzytkownikow</p>
              </div>

              {/* Karta: Zamowienia */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16.5 9.4 7.55 4.24" />
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" y1="22" x2="12" y2="12" />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-medium text-white">Zamowienia</p>
                <p className="mt-1 text-xs text-white/40">Przegladaj i obsluguj zamowienia</p>
              </div>

              {/* Karta: Produkty */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </div>
                <p className="mt-4 text-sm font-medium text-white">Produkty</p>
                <p className="mt-1 text-xs text-white/40">Dodawaj i edytuj produkty</p>
              </div>
            </div>

            <AddProductForm />
          </div>
        </main>
      </div>
    </div>
  );
}
