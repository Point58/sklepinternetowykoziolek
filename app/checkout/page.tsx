"use client";

import Link from "next/link";
import { useCart } from "../components/CartContext";
import PaymentMethods from "../components/checkout/PaymentMethods";
import CartTrigger from "../components/CartTrigger";
import Particles from "../components/Particles";

const navLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/kategorie", label: "Kategorie" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();

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
              <CartTrigger />
            </nav>
          </div>
        </header>

        <main className="flex-1 px-6 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-semibold tracking-tight text-black sm:text-3xl">
              Płatność
            </h1>

            {items.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-black/10 bg-white p-8 text-center">
                <p className="text-black/55">
                  Twój koszyk jest pusty. Dodaj produkty, aby przejść do płatności.
                </p>
                <Link
                  href="/oferta"
                  className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-black/88"
                >
                  Przejdź do oferty
                </Link>
              </div>
            ) : (
              <>
                <section className="mt-8">
                  <h2 className="text-lg font-semibold text-black">
                    Podsumowanie zamówienia
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between gap-4 rounded-xl border border-black/10 bg-white px-4 py-3"
                      >
                        <span className="text-black">
                          {item.name || "Produkt"} × {item.quantity}
                        </span>
                        <span className="text-black/70">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 flex justify-between border-t border-black/10 pt-4 text-base font-semibold text-black">
                    <span>Razem:</span>
                    <span>{totalPrice}</span>
                  </p>
                </section>

                <section className="mt-10">
                  <PaymentMethods totalPrice={totalPrice} />
                </section>

                <Link
                  href="/oferta"
                  className="mt-8 inline-block text-sm font-medium text-black/70 transition-all duration-200 hover:scale-105 hover:text-black"
                >
                  ← Wróć do oferty
                </Link>
              </>
            )}
          </div>
        </main>

        <footer className="border-t border-black/5 bg-white/50 px-6 py-8 sm:px-8">
          <div className="mx-auto max-w-5xl flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/"
              className="text-sm font-medium text-black hover:opacity-70"
            >
              Sklep
            </Link>
            <nav className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-black/55 hover:text-black"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mx-auto mt-4 max-w-5xl text-center text-xs text-black/45 sm:text-left">
            © {new Date().getFullYear()} Wszystkie prawa zastrzeżone.
          </p>
        </footer>
      </div>
    </div>
  );
}
