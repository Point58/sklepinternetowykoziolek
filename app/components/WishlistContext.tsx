"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import WishlistMenu from "./WishlistMenu";

export type WishlistItem = {
  id: string;
  name: string;
  price: string;
};

type WishlistContextValue = {
  items: WishlistItem[];
  totalItemsCount: number;
  isWishlistOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  toggleItem: (item: WishlistItem) => void;
  hasItem: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

const WISHLIST_STORAGE_KEY = "wishlist-items";

function loadWishlistFromStorage(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(loadWishlistFromStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const openWishlist = useCallback(() => setIsWishlistOpen(true), []);
  const closeWishlist = useCallback(() => setIsWishlistOpen(false), []);

  const addItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const toggleItem = useCallback((item: WishlistItem) => {
    setItems((prev) => {
      if (prev.find((i) => i.id === item.id)) {
        return prev.filter((i) => i.id !== item.id);
      }
      return [...prev, item];
    });
  }, []);

  const hasItem = useCallback(
    (id: string) => items.some((i) => i.id === id),
    [items]
  );

  const totalItemsCount = useMemo(() => items.length, [items]);

  const value = useMemo(
    () => ({
      items,
      totalItemsCount,
      isWishlistOpen,
      openWishlist,
      closeWishlist,
      addItem,
      removeItem,
      toggleItem,
      hasItem,
    }),
    [
      items,
      totalItemsCount,
      isWishlistOpen,
      openWishlist,
      closeWishlist,
      addItem,
      removeItem,
      toggleItem,
      hasItem,
    ]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
      <WishlistMenuSlot />
    </WishlistContext.Provider>
  );
}

function WishlistMenuSlot() {
  const ctx = useContext(WishlistContext);
  if (!ctx) return null;
  const { isWishlistOpen, closeWishlist } = ctx;
  return <WishlistMenu isOpen={isWishlistOpen} onClose={closeWishlist} />;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
