import { redirect } from "next/navigation";
import { createClient } from "@/app/lib/supabase/server";
import { isAdmin } from "@/app/lib/supabase/roles";
import Link from "next/link";
import ProfileDropdown from "@/app/components/ProfileDropdown";

export default async function ProfilPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/logowanie");
  }

  const initial = (user.email?.[0] ?? "U").toUpperCase();
  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const navLinks = [
    { label: "Strona główna", href: "/" },
    { label: "Oferta", href: "/oferta" },
    { label: "Kontakt", href: "/kontakt" },
  ];
  const userIsAdmin = await isAdmin(user.id);

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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <ProfileDropdown user={{ ...user, isAdmin: userIsAdmin }} />
            </nav>
          </div>
        </header>

        <main className="flex-1 px-6 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-2xl">
            {/* Profile header */}
            <div className="mb-10 flex items-center gap-5">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-xl font-semibold text-black">
                {initial}
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl font-semibold tracking-tight text-white">
                  Moje konto
                </h1>
                <p className="mt-1 truncate text-sm text-white/45">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Account info section */}
              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="4" />
                      <path d="M20 21a8 8 0 1 0-16 0" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-medium text-white">Dane konta</h2>
                    <p className="text-xs text-white/40">Informacje o Twoim koncie</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4">
                    <div>
                      <p className="text-xs text-white/40">Adres e-mail</p>
                      <p className="mt-0.5 text-sm text-white">{user.email}</p>
                    </div>
                    <Link
                      href="/ustawienia"
                      className="text-xs text-white/40 hover:text-white transition-colors duration-200"
                    >
                      Zmień
                    </Link>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4">
                    <div>
                      <p className="text-xs text-white/40">Hasło</p>
                      <p className="mt-0.5 text-sm text-white">••••••••</p>
                    </div>
                    <Link
                      href="/ustawienia"
                      className="text-xs text-white/40 hover:text-white transition-colors duration-200"
                    >
                      Zmień
                    </Link>
                  </div>

                  {createdAt && (
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4">
                      <p className="text-xs text-white/40">Konto utworzone</p>
                      <p className="mt-0.5 text-sm text-white">{createdAt}</p>
                    </div>
                  )}
                </div>
              </section>

              {/* Quick links */}
              <section className="grid gap-4 sm:grid-cols-2">
                <Link
                  href="/zamowienia"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/50 transition-colors duration-200 group-hover:bg-white/10 group-hover:text-white/70">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16.5 9.4 7.55 4.24" />
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                      <polyline points="3.29 7 12 12 20.71 7" />
                      <line x1="12" y1="22" x2="12" y2="12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Zamówienia</p>
                    <p className="text-xs text-white/40">Historia zakupów</p>
                  </div>
                </Link>

                <Link
                  href="/lista-zyczen"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/50 transition-colors duration-200 group-hover:bg-white/10 group-hover:text-white/70">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Lista życzeń</p>
                    <p className="text-xs text-white/40">Zapisane produkty</p>
                  </div>
                </Link>

                <Link
                  href="/ustawienia"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/50 transition-colors duration-200 group-hover:bg-white/10 group-hover:text-white/70">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Ustawienia</p>
                    <p className="text-xs text-white/40">Hasło, e-mail i konto</p>
                  </div>
                </Link>

                <Link
                  href="/pomoc"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/50 transition-colors duration-200 group-hover:bg-white/10 group-hover:text-white/70">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <path d="M12 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Pomoc</p>
                    <p className="text-xs text-white/40">Centrum pomocy i FAQ</p>
                  </div>
                </Link>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
