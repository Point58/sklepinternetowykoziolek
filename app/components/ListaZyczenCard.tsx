"use client";

import { useWishlist } from "./WishlistContext";

export default function ListaZyczenCard() {
  const { openWishlist, totalItemsCount } = useWishlist();

  return (
    <button
      onClick={openWishlist}
      className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/50 transition-colors duration-200 group-hover:bg-white/10 group-hover:text-white/70">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-white">
          Lista życzeń
          {totalItemsCount > 0 && (
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-medium text-black">
              {totalItemsCount}
            </span>
          )}
        </p>
        <p className="text-xs text-white/40">Zapisane produkty</p>
      </div>
    </button>
  );
}
