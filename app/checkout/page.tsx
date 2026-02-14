"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../components/CartContext";
import PaymentMethods from "../components/checkout/PaymentMethods";
import CartTrigger from "../components/CartTrigger";
import Particles from "../components/Particles";

const navLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/oferta", label: "Oferta" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  function handleOrderSuccess() {
    clearCart();
    setOrderPlaced(true);
  }

  return (
    <div className="page-backdrop page-home-dark min-h-screen text-white">
      <Particles variant="light" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
            <Link
              href="/oferta"
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
              <CartTrigger />
            </nav>
          </div>
        </header>

        <main className="flex-1 px-6 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {orderPlaced ? "Zamówienie złożone" : "Płatność"}
            </h1>

            {orderPlaced ? (
              <div className="mt-8 rounded-2xl border border-green-500/20 bg-green-500/10 p-8 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <svg
                    className="h-8 w-8 text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-green-300">
                  Dziękujemy za zamówienie!
                </h2>
                <p className="mt-3 text-sm text-white/60">
                  Twoje zamówienie zostało przyjęte. Szczegóły zostały wysłane na
                  nasz adres email. Skontaktujemy się z Tobą w celu potwierdzenia.
                </p>
                <p className="mt-2 text-sm text-white/50">
                  Płatność: za pobraniem przy odbiorze przesyłki.
                </p>
                <Link
                  href="/oferta"
                  className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-white/90"
                >
                  Wróć do sklepu
                </Link>
              </div>
            ) : items.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <p className="text-white/60">
                  Twój koszyk jest pusty. Dodaj produkty, aby przejść do
                  płatności.
                </p>
                <Link
                  href="/oferta"
                  className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-white/90"
                >
                  Przejdź do oferty
                </Link>
              </div>
            ) : (
              <>
                <section className="mt-8">
                  <h2 className="text-lg font-semibold text-white">
                    Podsumowanie zamówienia
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                      >
                        <span className="text-white">
                          {item.name || "Produkt"} × {item.quantity}
                        </span>
                        <span className="text-white/70">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 flex justify-between border-t border-white/10 pt-4 text-base font-semibold text-white">
                    <span>Razem:</span>
                    <span>{totalPrice}</span>
                  </p>
                </section>

                <section className="mt-10">
                  <PaymentMethods
                    items={items}
                    totalPrice={totalPrice}
                    onOrderSuccess={handleOrderSuccess}
                  />
                </section>

                <Link
                  href="/oferta"
                  className="mt-8 inline-block text-sm font-medium text-white/70 transition-all duration-200 hover:scale-105 hover:text-white"
                >
                  ← Wróć do oferty
                </Link>
              </>
            )}
          </div>
        </main>

        <footer className="border-t border-white/10 bg-black/30 px-6 py-8 sm:px-8">
          <div className="mx-auto max-w-5xl flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Link
              href="/"
              className="text-sm font-medium text-white/80 hover:text-white"
            >
              Sklep
            </Link>
            <nav className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/55 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mx-auto mt-4 max-w-5xl text-center text-xs text-white/45 sm:text-left">
            © {new Date().getFullYear()} Wszystkie prawa zastrzeżone.
          </p>
        </footer>
      </div>
    </div>
  );
}
