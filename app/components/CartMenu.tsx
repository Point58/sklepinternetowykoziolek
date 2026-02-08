"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";

type CartMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartMenu({ isOpen, onClose }: CartMenuProps) {
  const { items, totalPrice, removeItem, updateQuantity, closeCart } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm animate-cart-backdrop"
        onClick={onClose}
        aria-hidden
      />
      <aside
        className="fixed right-0 top-0 z-[101] flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#111] shadow-xl animate-cart-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Koszyk"
      >
        <div className="flex items-center justify-between border-b border-white/10 p-4">
          <h2 className="text-lg font-semibold text-white">Koszyk</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-white/60 hover:bg-white/10 hover:text-white"
            aria-label="Zamknij koszyk"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-white/55">Twój koszyk jest pusty.</p>
          ) : (
            <ul className="space-y-3">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white">
                      {item.name || "Produkt"}
                    </p>
                    <p className="text-sm text-white/55">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
                      aria-label="Zmniejsz ilość"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-sm">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="rounded-full p-1.5 text-white/60 hover:bg-white/10 hover:text-white"
                      aria-label="Zwiększ ilość"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="rounded-full p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
                    aria-label="Usuń z koszyka"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="border-t border-white/10 p-4 space-y-3">
            <p className="flex justify-between text-base font-semibold text-white">
              <span>Suma:</span>
              <span>{totalPrice}</span>
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-full bg-white py-3 text-center text-sm font-medium text-black transition-all duration-200 hover:scale-[1.02] hover:bg-white/90"
            >
              Kup
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
