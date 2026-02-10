"use client";

import { useCart } from "./CartContext";

export default function KoszykCard() {
  const { openCart, totalItemsCount } = useCart();

  return (
    <button
      onClick={openCart}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/50 transition-colors duration-200 group-hover:bg-white/10 group-hover:text-white/70">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-white">
          Koszyk
          {totalItemsCount > 0 && (
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-medium text-black">
              {totalItemsCount}
            </span>
          )}
        </p>
        <p className="text-xs text-white/40">Twoje produkty</p>
      </div>
    </button>
  );
}
