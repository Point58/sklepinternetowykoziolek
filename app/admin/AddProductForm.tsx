"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  created_at: string;
}

export default function AddProductForm() {
  const supabase = createClient();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoadingProducts(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoadingProducts(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let imageUrl: string | null = null;

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("product-images")
          .upload(fileName, imageFile);

        if (uploadError) {
          throw new Error(`Blad uploadu zdjecia: ${uploadError.message}`);
        }

        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      const { error: insertError } = await supabase.from("products").insert({
        name,
        description,
        price: parseFloat(price),
        image_url: imageUrl,
      });

      if (insertError) {
        throw new Error(`Blad zapisu produktu: ${insertError.message}`);
      }

      setMessage({ type: "success", text: "Produkt dodany pomyslnie!" });
      setName("");
      setDescription("");
      setPrice("");
      setImageFile(null);

      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]');
      if (fileInput) fileInput.value = "";

      fetchProducts();
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Wystapil nieoczekiwany blad",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-12">
      <h2 className="text-xl font-semibold text-white">Dodaj produkt</h2>
      <p className="mt-1 text-sm text-white/50">
        Wypelnij formularz, aby dodac nowy produkt do sklepu.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5 max-w-xl">
        <div>
          <label htmlFor="product-name" className="block text-sm font-medium text-white/70">
            Nazwa produktu
          </label>
          <input
            id="product-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/25 transition-colors"
            placeholder="Np. Koszulka z logo"
          />
        </div>

        <div>
          <label htmlFor="product-desc" className="block text-sm font-medium text-white/70">
            Opis
          </label>
          <textarea
            id="product-desc"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/25 transition-colors resize-none"
            placeholder="Krotki opis produktu..."
          />
        </div>

        <div>
          <label htmlFor="product-price" className="block text-sm font-medium text-white/70">
            Cena (PLN)
          </label>
          <input
            id="product-price"
            type="number"
            required
            min="0.01"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/25 transition-colors"
            placeholder="49.99"
          />
        </div>

        <div>
          <label htmlFor="product-image" className="block text-sm font-medium text-white/70">
            Zdjecie produktu
          </label>
          <input
            id="product-image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="mt-1.5 w-full text-sm text-white/50 file:mr-4 file:rounded-lg file:border-0 file:bg-white/10 file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-white/15 file:transition-colors file:cursor-pointer"
          />
        </div>

        {message && (
          <p
            className={`text-sm ${
              message.type === "success" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {message.text}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-white/10 px-6 py-2.5 text-sm font-medium text-white hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Dodawanie..." : "Dodaj produkt"}
        </button>
      </form>

      {/* Lista produktow */}
      <div className="mt-12">
        <h3 className="text-lg font-semibold text-white">Produkty</h3>
        {loadingProducts ? (
          <p className="mt-4 text-sm text-white/40">Ladowanie...</p>
        ) : products.length === 0 ? (
          <p className="mt-4 text-sm text-white/40">Brak produktow.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
              >
                {product.image_url && (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="p-4">
                  <p className="text-sm font-medium text-white">{product.name}</p>
                  <p className="mt-1 text-xs text-white/40 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-emerald-400">
                    {product.price.toFixed(2)} PLN
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
