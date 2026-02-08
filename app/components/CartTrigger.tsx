"use client";

import { useCart } from "./CartContext";

export default function CartTrigger() {
  const { openCart, totalItemsCount } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative inline-flex items-center gap-1.5 text-sm text-white/70 transition-all duration-200 hover:scale-105 hover:text-white"
    >
      Koszyk
      {totalItemsCount > 0 && (
        <span
          className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-medium text-black"
          aria-label={`${totalItemsCount} sztuk w koszyku`}
        >
          {totalItemsCount}
        </span>
      )}
    </button>
  );
}
