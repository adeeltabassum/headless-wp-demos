"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { EcommerceProduct } from "@/lib/ecommerce/content";

export type CartLine = {
  id: string;
  slug: string;
  title: string;
  price: string;
  priceValue: number;
  image?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  totalValue: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (product: EcommerceProduct, quantity?: number) => void;
  removeItem: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStored(key: string): CartLine[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CartLine[];
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function EcommerceCartProvider({
  children,
  initialItems = [],
  initiallyOpen = false,
  storageKey,
}: {
  children: ReactNode;
  initialItems?: CartLine[];
  initiallyOpen?: boolean;
  storageKey?: string;
}) {
  const [hydrated, setHydrated] = useState(!storageKey);
  const [items, setItems] = useState<CartLine[]>(initialItems);
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  useEffect(() => {
    if (!storageKey) return;
    const stored = readStored(storageKey);
    if (stored && stored.length) setItems(stored);
    else if (initialItems.length) setItems(initialItems);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once per key
  }, [storageKey]);

  useEffect(() => {
    if (!storageKey || !hydrated) return;
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items, storageKey, hydrated]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen((v) => !v), []);

  const addItem = useCallback((product: EcommerceProduct, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((l) => l.slug === product.slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === product.slug ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [
        ...prev,
        {
          id: product.slug,
          slug: product.slug,
          title: product.title,
          price: product.price,
          priceValue: product.priceValue,
          image: product.image,
          quantity,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setItems((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, quantity: Math.max(0, quantity) } : l))
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(
    () => items.reduce((sum, l) => sum + l.quantity, 0),
    [items]
  );
  const totalValue = useMemo(
    () => items.reduce((sum, l) => sum + l.priceValue * l.quantity, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      totalValue,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    }),
    [
      items,
      itemCount,
      totalValue,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useEcommerceCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useEcommerceCart must be used within EcommerceCartProvider");
  }
  return ctx;
}
