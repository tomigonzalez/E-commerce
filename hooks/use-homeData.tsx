// stores/useHomeData.ts
import { create } from "zustand";

interface Media {
  id: number;
  documentId: string;
  name: string;

  url: string;
}

interface HomeData {
  tituloHero?: string;
  mostrarBannerDescuento?: boolean;
  bannerDescuentoTexto?: string;
  imagenHero: Media[]; // Cambiamos string a un array de objetos Media
  galeriaImg: Media[];
}

interface HomeDataState {
  data: HomeData[] | null;
  setData: (data: HomeData[]) => void;
}

export const useHomeData = create<HomeDataState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));
