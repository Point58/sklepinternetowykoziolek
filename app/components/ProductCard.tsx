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
    <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm transition-transform duration-200 hover:scale-[1.02]">
      <p className="text-sm text-black/50">
        {product.name || "—"}
      </p>
      <p className="mt-2 text-xl font-semibold text-black">{product.price}</p>
      <button
        type="button"
        onClick={() => addItem(product)}
        className="mt-4 w-full rounded-full bg-black px-4 py-3 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-black/88"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
}
