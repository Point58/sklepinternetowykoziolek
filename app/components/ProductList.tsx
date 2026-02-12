"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/lib/supabase/client";
import ProductCard from "./ProductCard";

interface DbProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
}

export default function ProductList() {
  const supabase = createClient();
  const [products, setProducts] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="mt-6 text-white/40">Ładowanie produktów...</p>;
  }

  if (products.length === 0) {
    return (
      <p className="mt-6 text-white/60">
        Brak produktów w ofercie. Wróć wkrótce!
      </p>
    );
  }

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={{
            id: product.id,
            name: product.name,
            price: product.price.toFixed(2).replace(".", ",") + " zł",
            description: product.description,
            image_url: product.image_url,
          }}
        />
      ))}
    </div>
  );
}
