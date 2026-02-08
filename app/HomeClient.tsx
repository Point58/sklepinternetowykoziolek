"use client";

import Link from "next/link";
import Particles from "./components/Particles";
<<<<<<< HEAD
import { useCart } from "./components/CartContext";
=======
import ProfileDropdown from "./components/ProfileDropdown";
>>>>>>> 01f31748a1798ec8355c4aa50886ce2a672e223c
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/oferta", label: "Oferta" },
  { href: "/kontakt", label: "Kontakt" },
];

const sections = [
  {
    id: "oferta",
    title: "Oferta",
    subtitle: "Prosty proces zakupów",
    description:
      "Wybierz produkt, dodaj do koszyka, zapłać i odbierz przesyłkę. Wygodne zakupy w kilku krokach.",
  },
  {
    id: "dostawa",
    title: "Dostawa",
    subtitle: "Szybka dostawa",
    description:
      "Wysyłamy zamówienia w ciągu 24 godzin. Każda paczka jest starannie zapakowana i ubezpieczona.",
  },
  {
    id: "platnosci",
    title: "Płatności",
    subtitle: "Bezpieczne płatności",
    description:
      "Różne metody płatności i gwarancja bezpieczeństwa. BLIK, karta, przelew — wybór należy do Ciebie.",
  },
  {
    id: "zwroty",
    title: "Zwroty",
    subtitle: "Zwroty do 30 dni",
    description:
      "Bezproblemowy zwrot towaru w ciągu 30 dni. Wystarczy wypełnić formularz i odesłać paczkę.",
  },
  {
    id: "newsletter",
    title: "Newsletter",
    subtitle: "Bądź na bieżąco",
    description:
      "Zapisz się do newslettera i dowiedz się o nowych produktach jako pierwszy.",
  },
];

const workflowSteps = [
  { label: "Wybierz produkt", icon: "🔍" },
  { label: "Dodaj do koszyka", icon: "🛒" },
  { label: "Płatność", icon: "💳" },
  { label: "Dostawa", icon: "📦" },
];

function SectionPanel({ sectionId }: { sectionId: string }) {
  switch (sectionId) {
    case "oferta":
      return (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex-shrink-0 rounded-2xl border border-white/10 bg-white/5 p-4 sm:w-40">
              <div className="aspect-[4/3] rounded-xl bg-white/10 flex items-center justify-center text-center text-sm text-white/60">
                Produkt
              </div>
              <p className="mt-2 text-xs text-white/50">Wybierz produkt</p>
            </div>
            <div className="flex flex-1 flex-col gap-2.5">
              {workflowSteps.slice(1).map((step) => (
                <div
                  key={step.label}
                  className="rounded-xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{step.icon}</span>
                    <span className="text-sm text-white/80">{step.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/oferta"
            className="mt-2 inline-block self-start rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-white/90"
          >
            Przejdź do oferty
          </Link>
        </div>
      );

    case "dostawa":
      return (
        <div className="flex flex-col gap-5">
          <div className="grid grid-cols-3 gap-3">
            {["Zamówienie", "Pakowanie", "Wysyłka"].map((step, i) => (
              <div key={step} className="flex flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-xl">
                  {["📋", "📦", "🚚"][i]}
                </div>
                <span className="text-xs text-white/60">{step}</span>
              </div>
            ))}
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">
              24h
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                Ekspresowa realizacja
              </p>
              <p className="text-xs text-white/50">
                Zamówienia wysyłamy następnego dnia roboczego
              </p>
            </div>
          </div>
        </div>
      );

    case "platnosci":
      return (
        <div className="flex flex-col gap-4">
          {[
            { name: "BLIK", desc: "Szybki kod z telefonu", icon: "📱" },
            { name: "Karta", desc: "Visa, Mastercard", icon: "💳" },
            { name: "Przelew", desc: "Tradycyjny przelew bankowy", icon: "🏦" },
          ].map((method) => (
            <div
              key={method.name}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/[0.08]"
            >
              <span className="text-2xl">{method.icon}</span>
              <div>
                <p className="text-sm font-medium text-white">{method.name}</p>
                <p className="text-xs text-white/50">{method.desc}</p>
              </div>
              <div className="ml-auto h-2 w-2 rounded-full bg-emerald-400/60" />
            </div>
          ))}
          <div className="mt-1 flex items-center gap-2 text-xs text-white/40">
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            Szyfrowane połączenie SSL
          </div>
        </div>
      );

    case "zwroty":
      return (
        <div className="flex flex-col gap-5">
          <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-blue-500/20 text-2xl">
              📋
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                1. Wypełnij formularz
              </p>
              <p className="mt-1 text-xs text-white/50">
                Zgłoś zwrot przez formularz na stronie
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-2xl">
              📦
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                2. Odeślij paczkę
              </p>
              <p className="mt-1 text-xs text-white/50">
                Zapakuj produkt i wyślij na podany adres
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl">
              💰
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                3. Odbierz zwrot
              </p>
              <p className="mt-1 text-xs text-white/50">
                Pieniądze wrócą w ciągu 5 dni roboczych
              </p>
            </div>
          </div>
          <div className="rounded-lg bg-white/5 px-4 py-2.5 text-center text-xs text-white/40">
            30 dni na zwrot od daty dostawy
          </div>
        </div>
      );

    case "newsletter":
      return (
        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-medium text-white">Co zyskujesz?</p>
            <ul className="mt-3 flex flex-col gap-2">
              {[
                "Informacje o nowych produktach",
                "Ekskluzywne rabaty",
                "Darmowa dostawa na pierwsze zamówienie",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white/60"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <form
            className="flex flex-col gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Adres e-mail"
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20"
              aria-label="Adres e-mail do newslettera"
            />
            <button
              type="submit"
              className="rounded-xl bg-white px-5 py-3 text-sm font-medium text-black transition-all duration-200 hover:scale-[1.02] hover:bg-white/90"
            >
              Zapisz się
            </button>
          </form>
        </div>
      );

    default:
      return null;
  }
}

<<<<<<< HEAD
export default function HomeClient({ user }: { user: boolean }) {
  const { openCart, totalItemsCount } = useCart();
=======
export default function HomeClient({ user }: { user: { email: string | null } | null }) {
>>>>>>> 01f31748a1798ec8355c4aa50886ce2a672e223c
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sections[index].id);
            }
          });
        },
        {
          root: null,
          rootMargin: "-40% 0px -40% 0px",
          threshold: 0,
        }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <div className="page-backdrop page-home-dark min-h-screen text-white">
      <Particles variant="light" />
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 sm:px-8">
            <Link
              href="/"
              className="inline-block text-sm font-medium text-white/90 transition-all duration-200 hover:scale-105 hover:text-white"
            >
              Sklep
            </Link>
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-block text-sm text-white/70 transition-all duration-200 hover:scale-105 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={openCart}
                className="relative inline-flex items-center gap-1.5 text-sm text-white/70 transition-all duration-200 hover:scale-105 hover:text-white"
              >
                Koszyk
<<<<<<< HEAD
                {totalItemsCount > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-medium text-black">
                    {totalItemsCount}
                  </span>
                )}
              </button>
              <Link
                href={user ? "/profil" : "/logowanie"}
                className="text-sm text-white/70 transition-all duration-200 hover:scale-105 hover:text-white"
              >
                {user ? "Profil" : "Zaloguj się"}
              </Link>
=======
              </Link>
              <ProfileDropdown user={user} />
>>>>>>> 01f31748a1798ec8355c4aa50886ce2a672e223c
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero intro */}
          <section className="px-6 pt-20 pb-10 sm:px-8 sm:pt-28 sm:pb-16">
            <div className="mx-auto max-w-6xl">
              <h1
                className="animate-fade-in-up text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl"
                style={{ animationDelay: "0.1s", opacity: 0 }}
              >
                Witaj w sklepie.
              </h1>
              <p
                className="animate-fade-in-up mt-6 max-w-lg text-lg leading-relaxed text-white/60"
                style={{ animationDelay: "0.25s", opacity: 0 }}
              >
                Odkryj ofertę i zrób zakupy wygodnie. Szybka dostawa i
                bezpieczne płatności.
              </p>
              <div
                className="animate-fade-in-up mt-8 flex flex-wrap gap-4"
                style={{ animationDelay: "0.4s", opacity: 0 }}
              >
                <Link
                  href="/oferta"
                  className="inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-white/90"
                >
                  Przeglądaj kategorie
                </Link>
                <Link
                  href="/kontakt"
                  className="inline-block rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-white/30 hover:bg-white/5"
                >
                  Skontaktuj się
                </Link>
              </div>
            </div>
          </section>

          {/* Scroll-driven sections */}
          <section className="px-6 pt-8 pb-24 sm:px-8 sm:pb-32">
            <div className="mx-auto max-w-6xl">
              <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-16 xl:grid-cols-[1fr_460px]">
                {/* Left: sticky titles */}
                <div className="hidden lg:block">
                  <div className="sticky top-28">
                    <nav className="flex flex-col gap-2">
                      {sections.map((section) => (
                        <button
                          type="button"
                          key={section.id}
                          onClick={() => {
                            const idx = sections.findIndex(
                              (s) => s.id === section.id
                            );
                            sectionRefs.current[idx]?.scrollIntoView({
                              behavior: "smooth",
                              block: "center",
                            });
                          }}
                          className={`text-left transition-all duration-500 ${
                            activeSection === section.id
                              ? "text-white"
                              : "text-white/20 hover:text-white/40"
                          }`}
                        >
                          <span className="block text-5xl font-semibold tracking-tight xl:text-6xl">
                            {section.title}
                          </span>
                        </button>
                      ))}
                    </nav>

                    {/* Active section description */}
                    <div className="mt-10 max-w-sm">
                      {sections.map((section) => (
                        <div
                          key={section.id}
                          className={`transition-all duration-500 ${
                            activeSection === section.id
                              ? "opacity-100"
                              : "hidden opacity-0"
                          }`}
                        >
                          <p className="text-sm font-medium text-white/80">
                            {section.subtitle}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-white/50">
                            {section.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: scrolling panels */}
                <div className="flex flex-col gap-6 lg:gap-0">
                  {sections.map((section, index) => (
                    <div
                      key={section.id}
                      ref={(el) => {
                        sectionRefs.current[index] = el;
                      }}
                      className="scroll-mt-28 lg:min-h-[70vh] lg:flex lg:items-center"
                    >
                      <div className="w-full">
                        {/* Mobile: show title inline */}
                        <div className="mb-4 lg:hidden">
                          <h2 className="text-3xl font-semibold tracking-tight text-white">
                            {section.title}
                          </h2>
                          <p className="mt-1 text-sm text-white/50">
                            {section.subtitle}
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-white/40">
                            {section.description}
                          </p>
                        </div>
                        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl backdrop-blur-sm sm:p-8">
                          <SectionPanel sectionId={section.id} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Wkrótce w ofercie */}
          <section className="px-6 pb-20 sm:px-8 sm:pb-28">
            <div className="mx-auto max-w-6xl">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl sm:p-10 md:p-12">
                <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Wkrótce w ofercie
                </h2>
                <p className="mt-4 text-white/60">
                  Pracujemy nad katalogiem produktów. Wróć wkrótce.
                </p>
                <div className="mt-10 grid gap-6 sm:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm text-white/40"
                    >
                      Produkt {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-black/30 px-6 py-10 sm:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <Link
                href="/"
                className="text-sm font-medium text-white/80 transition-all duration-200 hover:scale-105 hover:text-white"
              >
                Sklep
              </Link>
              <nav className="flex gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/55 transition-all duration-200 hover:scale-105 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
            <p className="mt-6 text-center text-xs text-white/45 sm:text-left">
              © {new Date().getFullYear()} Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
