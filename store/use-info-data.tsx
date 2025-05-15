import { InfoDataType } from "@/types/info";
import { create } from "zustand";

interface InfoDataStore {
  data: InfoDataType | null;
  setData: (data: InfoDataType[] | InfoDataType) => void;
}

export const useInfoData = create<InfoDataStore>((set) => ({
  data: null,
  setData: (data) => {
    // Si viene como array, tomamos el primero
    if (Array.isArray(data)) {
      set({ data: data[0] ?? null });
    } else {
      set({ data });
    }
  },
}));
