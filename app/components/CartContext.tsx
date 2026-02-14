"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createClient } from "@/app/lib/supabase/client";
import CartMenu from "./CartMenu";

export type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
};

/** Parsuje cenę np. "29,99 zł" na liczbę */
export function parsePrice(priceStr: string): number {
  const cleaned = priceStr.replace(/\s*zł\s*/gi, "").trim().replace(",", ".");
  const n = parseFloat(cleaned);
  return Number.isNaN(n) ? 0 : n;
}

/** Formatuje liczbę na cenę np. "59,98 zł" */
export function formatPrice(value: number): string {
  return value.toFixed(2).replace(".", ",") + " zł";
}

type CartContextValue = {
  items: CartItem[];
  totalItemsCount: number;
  totalPrice: string;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: { id: string; name: string; price: string }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_STORAGE_KEY = "cart-items";

function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadCartFromStorage();
    setItems(loaded);
    setHydrated(true);

    if (loaded.length > 0) {
      const supabase = createClient();
      const ids = loaded.map((i) => i.id);
      supabase
        .from("products")
        .select("id")
        .in("id", ids)
        .then(({ data }) => {
          if (data) {
            const existingIds = new Set(data.map((p: { id: string }) => p.id));
            setItems((prev) => prev.filter((i) => existingIds.has(i.id)));
          }
        });
    }
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addItem = useCallback(
    (item: { id: string; name: string; price: string }) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        }
        return [...prev, { ...item, quantity: 1 }];
      });
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItemsCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(() => {
    const sum = items.reduce(
      (sum, i) => sum + parsePrice(i.price) * i.quantity,
      0
    );
    return formatPrice(sum);
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      totalItemsCount,
      totalPrice,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [
      items,
      totalItemsCount,
      totalPrice,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartMenuSlot />
    </CartContext.Provider>
  );
}

function CartMenuSlot() {
  const ctx = useContext(CartContext);
  if (!ctx) return null;
  const { isCartOpen, closeCart } = ctx;
  return <CartMenu isOpen={isCartOpen} onClose={closeCart} />;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
