"use client";

import Link from "next/link";
import { useCart } from "../components/CartContext";
import Particles from "../components/Particles";

const navLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/kategorie", label: "Kategorie" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function KoszykPage() {
  const { openCart, totalItemsCount } = useCart();

  return (
    <div className="page-backdrop min-h-screen text-black">
      <Particles />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
            <Link
              href="/oferta"
              className="inline-block text-sm font-medium text-black transition-all duration-200 hover:scale-105 hover:opacity-70"
            >
              Sklep
            </Link>
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-block text-sm text-black/70 transition-all duration-200 hover:scale-105 hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={openCart}
                className="relative inline-flex items-center gap-1.5 text-sm font-medium text-black transition-all duration-200 hover:scale-105"
              >
                Koszyk
                {totalItemsCount > 0 && (
                  <span
                    className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs font-medium text-white"
                    aria-label={`${totalItemsCount} sztuk w koszyku`}
                  >
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </nav>
          </div>
        </header>

        <main className="flex-1 px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-md text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
              Koszyk jest w menu
            </h1>
            <p className="mt-4 text-black/55">
              Kliknij „Koszyk” w nawigacji lub poniżej, aby otworzyć koszyk.
            </p>
            <button
              type="button"
              onClick={openCart}
              className="mt-8 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-black/88"
            >
              Otwórz koszyk
            </button>
            <Link
              href="/"
              className="mt-6 block text-sm font-medium text-black/70 transition-all duration-200 hover:scale-105 hover:text-black"
            >
              ← Strona główna
            </Link>
          </div>
        </main>

        <footer className="border-t border-black/5 bg-white/50 px-6 py-10 sm:px-8">
          <div className="mx-auto max-w-5xl flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Link
              href="/"
              className="inline-block text-sm font-medium text-black transition-all duration-200 hover:scale-105 hover:opacity-70"
            >
              Sklep
            </Link>
            <nav className="flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-block text-sm text-black/55 transition-all duration-200 hover:scale-105 hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mx-auto mt-6 max-w-5xl text-center text-xs text-black/45 sm:text-left">
            © {new Date().getFullYear()} Wszystkie prawa zastrzeżone.
          </p>
        </footer>
      </div>
    </div>
  );
}
