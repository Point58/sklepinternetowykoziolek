"use client";

import { useCart } from "./CartContext";
import { useWishlist } from "./WishlistContext";

type Product = {
  id: string;
  name: string;
  price: string;
  description?: string;
  image_url?: string | null;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { toggleItem, hasItem } = useWishlist();
  const isInWishlist = hasItem(product.id);

  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 shadow-sm transition-transform duration-200 hover:scale-[1.02] overflow-hidden">
      {product.image_url && (
        <img
          src={product.image_url}
          alt={product.name}
          className="h-48 w-full object-cover"
        />
      )}
      <div className="p-6">
        <button
          type="button"
          onClick={() => toggleItem(product)}
          className="absolute top-4 right-4 rounded-full bg-black/40 p-2 transition-colors duration-200 hover:bg-white/10"
          aria-label={isInWishlist ? "Usuń z listy życzeń" : "Dodaj do listy życzeń"}
          title={isInWishlist ? "Usuń z listy życzeń" : "Dodaj do listy życzeń"}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isInWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isInWishlist ? "text-red-400" : "text-white/40 hover:text-white/70"}
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>
        <p className="text-sm font-medium text-white/80 pr-10">
          {product.name || "\u2014"}
        </p>
        {product.description && (
          <p className="mt-1 text-xs text-white/40 line-clamp-2">{product.description}</p>
        )}
        <p className="mt-2 text-xl font-semibold text-white">{product.price}</p>
        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-4 w-full rounded-full bg-white px-4 py-3 text-sm font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-white/90"
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  );
}
