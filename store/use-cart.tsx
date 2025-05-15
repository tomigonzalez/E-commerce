import { create } from "zustand";
import { ProductType } from "@/types/product";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "sonner";

interface CartItem extends ProductType {
  quantity: number;
  sizeSelected: string; // ✅ Talle seleccionado
}

interface CartStore {
  items: CartItem[];
  addItem: (data: ProductType, size: string) => void;
  removeItem: (id: number, size: string) => void;
  removeOneItem: (id: number, size: string) => void;
  clearCart: () => void;
}

export const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: ProductType, size: string) => {
        const currentItems = get().items;
        const existingItem = currentItems.find(
          (item) => item.id === data.id && item.sizeSelected === size
        );

        const sizeData = data.size_stock.find((s) => s.size === size);

        if (!sizeData) {
          toast("Talle no válido", {
            style: { backgroundColor: "#E6C229", color: "#FFF" },
          });
          return;
        }

        if (existingItem) {
          if (existingItem.quantity < sizeData.stock) {
            set({
              items: currentItems.map((item) =>
                item.id === data.id && item.sizeSelected === size
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
            items: [
              ...currentItems,
              { ...data, quantity: 1, sizeSelected: size },
            ],
          });
          toast("Producto añadido al carrito.", {
            style: {
              backgroundColor: "#48BB78",
              color: "#FFFFFF",
            },
          });
        }
      },
      removeItem: (id: number, size: string) => {
        if (
          confirm(
            "¿Estás seguro de que quieres eliminar este producto del carrito?"
          )
        ) {
          set({
            items: get().items.filter(
              (item) => !(item.id === id && item.sizeSelected === size)
            ),
          });
          toast("Producto eliminado del carrito.", {
            style: {
              backgroundColor: "#D11149",
              color: "#FFFFFF",
            },
          });
        }
      },
      removeOneItem: (id: number, size: string) => {
        set({
          items: get()
            .items.map((item) =>
              item.id === id && item.sizeSelected === size
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
