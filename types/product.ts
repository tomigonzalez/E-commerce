export type ImageType = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    large?: { url: string };
    medium?: { url: string };
    small?: { url: string };
    thumbnail?: { url: string };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type CategoryType = {
  id: number;
  documentId: string;
  categoryName: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  mainImage: {url:string} | null;
};

export type SubCategoryType = {
  id: number;
  documentId: string;
  subCategoryName: string;
  slug: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};
export type SizeStockType = {
  id: number; 
  size: "XS" | "S" | "M" | "UNICO" | "L" | "XL"| "XXL"| "XXXL";
  stock: number;
};

export type ProductType = {
  id: number;
  documentId: string;
  productName: string;
  description: string;
  price: number;
  active: boolean;
  isFeatured: boolean;
  slug: string | null;
  images: ImageType[] | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  category: CategoryType;
  sub_category?: SubCategoryType | null; // Subcategoría opcional

  size_stock:SizeStockType[];
};
