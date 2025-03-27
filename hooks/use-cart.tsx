import { create } from "zustand";
import { ProductType } from "@/types/product";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface CartItem extends ProductType {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (data: ProductType) => void;
  removeItem: (id: number) => void;
  removeOneItem: (id: number) => void; // Agregamos removeOneItem
  removeAll: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductType) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === data.id);

        if (existingItem) {
          if (existingItem.quantity < data.stock) {
            set({
              items: currentItems.map((item) =>
                item.id === data.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            });
            toast("Producto añadido al carrito.");
          } else {
            toast("No hay suficiente stock disponible.");
          }
        } else {
          set({
            items: [...get().items, { ...data, quantity: 1 }],
          });
          toast("Producto añadido al carrito.");
        }
      },
      removeItem: (id: number) => {
        set({ items: get().items.filter((item) => item.id !== id) });
        toast("Producto eliminado del carrito.");
      },
      removeOneItem: (id: number) => {
        // Implementamos removeOneItem
        set({
          items: get()
            .items.map((item) =>
              item.id === id
                ? item.quantity > 1
                  ? { ...item, quantity: item.quantity - 1 }
                  : null // Retornamos null para filtrar el producto si la cantidad es 1
                : item
            )
            .filter(Boolean) as CartItem[], // Filtramos los null
        });
      },
      removeAll: () => set({ items: [] }),
    }),
    { name: "cart-storage", storage: createJSONStorage(() => localStorage) }
  )
);
