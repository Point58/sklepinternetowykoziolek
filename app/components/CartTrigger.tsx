"use client";

import { useCart } from "./CartContext";

export default function CartTrigger() {
  const { openCart, totalItemsCount } = useCart();

  return (
    <button
      type="button"
      onClick={openCart}
      className="relative inline-flex items-center gap-1.5 text-sm text-black/70 transition-all duration-200 hover:scale-105 hover:text-black"
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
  );
}
