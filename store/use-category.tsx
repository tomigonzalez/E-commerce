import { CategoryType } from "@/types/product";
import { create } from "zustand";

interface CategoryStore {
  categories: CategoryType[] | null;
  loading: boolean;
  error: string;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: null,
  loading: true,
  error: "",
  fetchCategories: async () => {
    set({ loading: true });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      set({ categories: data.data, error: "" });
    } catch (error: any) {
      set({ error: error.message || "Error fetching categories" });
    } finally {
      set({ loading: false });
    }
  },
}));
