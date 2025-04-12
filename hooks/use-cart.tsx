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
  removeOneItem: (id: number) => void;
  clearCart: () => void; // ✅ Nuevo método
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
            toast("Producto añadido al carrito.", {
              style: {
                backgroundColor: "#48BB78",
                color: "#FFFFFF",
              },
            });
          } else {
            toast("No hay suficiente stock disponible.", {
              style: {
                backgroundColor: "#E6C229",
                color: "#FFFFFF",
              },
            });
          }
        } else {
          set({
            items: [...get().items, { ...data, quantity: 1 }],
          });
          toast("Producto añadido al carrito.", {
            style: {
              backgroundColor: "#48BB78",
              color: "#FFFFFF",
            },
          });
        }
      },
      removeItem: (id: number) => {
        if (
          confirm(
            "¿Estás seguro de que quieres eliminar este producto del carrito?"
          )
        ) {
          set({ items: get().items.filter((item) => item.id !== id) });
          toast("Producto eliminado del carrito.", {
            style: {
              backgroundColor: "#D11149",
              color: "#FFFFFF",
            },
          });
        }
      },
      removeOneItem: (id: number) => {
        set({
          items: get()
            .items.map((item) =>
              item.id === id
                ? item.quantity > 1
                  ? { ...item, quantity: item.quantity - 1 }
                  : null
                : item
            )
            .filter(Boolean) as CartItem[],
        });
      },
      clearCart: () => {
        set({ items: [] });
        toast("Carrito vaciado.", {
          style: {
            backgroundColor: "#718096",
            color: "#FFFFFF",
          },
        });
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
