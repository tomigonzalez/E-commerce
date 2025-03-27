export type FilterTypes = {
    result: ResultFilterTypes | null;
    loading: boolean;
    error: string;
}

export type ResultFilterTypes = {
    id: number;
  documentId: string;
  productName: string;
  slug: string | null;
  description: string;
  active: boolean;
  price: number;
  isFeatured: boolean;
  
  tipoProducto: string;
  images: string[] | null;
  category: {
    id: number;
    documentId: string;
    categoryName: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}