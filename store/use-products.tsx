// store/use-product.ts
import { create } from "zustand";
import { ProductType } from "@/types/product";

type ProductStore = {
  products: ProductType[] | null;
  loading: boolean;
  error: string;
  fetchProducts: () => Promise<void>;
  setProducts: (products: ProductType[]) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: null,
  loading: false,
  error: "",
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`
      );
      const json = await res.json();
      set({ products: json.data, loading: false });
    } catch (error: any) {
      set({ error: error.message || "Error", loading: false });
    }
  },
  setProducts: (products) => set({ products }),
}));
