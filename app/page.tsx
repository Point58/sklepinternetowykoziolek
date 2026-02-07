import Link from "next/link";
import Particles from "./components/Particles";
import { createClient } from "@/app/lib/supabase/server";

const navLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/kategorie", label: "Kategorie" },
  { href: "/kontakt", label: "Kontakt" },
];

const features = [
  {
    title: "Szybka dostawa",
    description: "Wysyłamy zamówienia w ciągu 24 godzin.",
  },
  {
    title: "Bezpieczne płatności",
    description: "Różne metody płatności i gwarancja bezpieczeństwa.",
  },
  {
    title: "Zwroty do 30 dni",
    description: "Bezproblemowy zwrot towaru w ciągu 30 dni.",
  },
];

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="page-backdrop min-h-screen text-black">
      <Particles />
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header
          className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl"
          style={{ animationDelay: "0s" }}
        >
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
            <Link
              href="/"
              className="text-sm font-medium text-black hover:opacity-70 transition-opacity duration-200"
            >
              Sklep
            </Link>
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-black/70 hover:text-black transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/koszyk"
                className="text-sm text-black/70 hover:text-black transition-colors duration-200"
              >
                Koszyk
              </Link>
              <Link
                href={user ? "/profil" : "/logowanie"}
                className="text-sm text-black/70 hover:text-black transition-colors duration-200"
              >
                {user ? "Profil" : "Zaloguj się"}
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero – wyraźna hierarchia, więcej przestrzeni */}
          <section className="px-6 pt-28 pb-36 sm:px-8 sm:pt-36 sm:pb-44 md:pt-40 md:pb-48">
            <div className="mx-auto max-w-3xl text-center">
              <h1
                className="animate-fade-in-up text-5xl font-semibold tracking-tight text-black sm:text-6xl md:text-7xl lg:text-[4rem] lg:leading-[1.1]"
                style={{ animationDelay: "0.1s", opacity: 0 }}
              >
                Witaj w sklepie.
              </h1>
              <p
                className="mt-8 animate-fade-in-up text-xl tracking-tight text-black/55 sm:text-2xl md:max-w-2xl md:mx-auto md:leading-relaxed"
                style={{ animationDelay: "0.25s", opacity: 0 }}
              >
                Wkrótce pojawią się tu nasze produkty. Zostań z nami i sprawdź ofertę.
              </p>
              <div
                className="mt-14 flex flex-wrap justify-center gap-4 sm:gap-5 animate-fade-in-up"
                style={{ animationDelay: "0.4s", opacity: 0 }}
              >
                <Link
                    href="/kategorie"
                    className="inline-block rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-black/88 transition-all duration-200"
                  >
                    Przeglądaj kategorie
                  </Link>
                <Link
                    href="/kontakt"
                    className="inline-block rounded-full border border-black/15 bg-white/80 px-7 py-3.5 text-sm font-medium text-black shadow-sm hover:bg-white hover:border-black/25 transition-all duration-200"
                  >
                    Skontaktuj się
                  </Link>
              </div>
            </div>
          </section>

          {/* Zalety – karty z zaokrągleniami i cieniem */}
          <section className="px-6 pb-24 sm:px-8 sm:pb-32">
            <div className="mx-auto max-w-5xl">
              <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-10 md:p-12">
                <h2
                  className="animate-fade-in-up text-center text-2xl font-semibold tracking-tight text-black sm:text-3xl md:text-4xl"
                  style={{ animationDelay: "0.1s", opacity: 0 }}
                >
                  Dlaczego warto u nas kupować?
                </h2>
                <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-12 md:mt-16">
                  {features.map((feature, i) => (
                    <div
                      key={feature.title}
                      className="animate-fade-in-up text-center"
                      style={{
                        animationDelay: `${0.2 + i * 0.1}s`,
                        opacity: 0,
                      }}
                    >
                      <h3 className="text-lg font-medium text-black">
                        {feature.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-black/55">
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Placeholder na produkty */}
          <section className="px-6 pb-24 sm:px-8 sm:pb-32">
            <div className="mx-auto max-w-5xl">
              <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-10 md:p-12">
                <h2
                  className="animate-fade-in-up text-2xl font-semibold tracking-tight text-black sm:text-3xl md:text-4xl"
                  style={{ animationDelay: "0.1s", opacity: 0 }}
                >
                  Wkrótce w ofercie
                </h2>
                <p
                  className="mt-4 animate-fade-in-up text-lg text-black/55"
                  style={{ animationDelay: "0.15s", opacity: 0 }}
                >
                  Pracujemy nad katalogiem produktów. Wróć wkrótce.
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-3 md:mt-14">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="animate-fade-in-up aspect-[4/3] rounded-2xl border border-black/8 bg-black/[0.02] flex items-center justify-center text-black/40 text-sm"
                      style={{
                        animationDelay: `${0.2 + i * 0.08}s`,
                        opacity: 0,
                      }}
                    >
                      Produkt {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Newsletter */}
          <section className="px-6 pb-28 sm:px-8 sm:pb-36">
            <div className="mx-auto max-w-5xl">
              <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-12 md:p-16">
                <div className="mx-auto max-w-xl text-center">
                  <h2
                    className="animate-fade-in-up text-2xl font-semibold tracking-tight text-black sm:text-3xl md:text-4xl"
                    style={{ animationDelay: "0.1s", opacity: 0 }}
                  >
                    Bądź na bieżąco
                  </h2>
                  <p
                    className="mt-4 animate-fade-in-up text-lg text-black/55"
                    style={{ animationDelay: "0.2s", opacity: 0 }}
                  >
                    Zapisz się do newslettera i dowiedz się o nowych produktach.
                  </p>
                  <form
                    className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center animate-fade-in-up"
                    style={{ animationDelay: "0.3s", opacity: 0 }}
                  >
                    <input
                        type="email"
                        placeholder="Adres e-mail"
                        className="rounded-full border border-black/12 bg-black/[0.02] px-5 py-3.5 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/15 sm:min-w-[280px]"
                        aria-label="Adres e-mail do newslettera"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-black px-6 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-black/88 transition-all duration-200"
                      >
                        Zapisz się
                      </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-black/5 bg-white/50 px-6 py-10 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <Link
                href="/"
                className="text-sm font-medium text-black hover:opacity-70 transition-opacity duration-200"
              >
                Sklep
              </Link>
              <nav className="flex gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-black/55 hover:text-black transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <p className="mt-6 text-center text-xs text-black/45 sm:text-left">
              © {new Date().getFullYear()} Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
