import { create } from "zustand";
import { ProductType } from "@/types/product";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface CartStore {
  items: ProductType[];
  addItem: (data: ProductType) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id == data.id);

        if (existingItem) {
          return toast("El producto ya existeen el carrito.");
        }
        set({
          items: [...get().items, data],
        });
        toast("Producto añadido al carrito.");
      },
      removeItem: (id: number) => {
        set({ items: [...get().items.filter((item) => item.id != id)] });
        toast("Producto eliminado del carrito.");
      },
      removeAll: () => set({ items: [] }),
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);
