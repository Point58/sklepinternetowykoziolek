"use client";

import { useCart } from "./CartContext";

type Product = {
  id: string;
  name: string;
  price: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm transition-transform duration-200 hover:scale-[1.02]">
      <p className="text-sm text-white/50">
        {product.name || "—"}
      </p>
      <p className="mt-2 text-xl font-semibold text-white">{product.price}</p>
      <button
        type="button"
        onClick={() => addItem(product)}
        className="mt-4 w-full rounded-full bg-white px-4 py-3 text-sm font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-white/90"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
}
