import { CategoryType, ProductType } from "@/types/product";
import { useEffect, useState } from "react";

// Hook genérico para hacer peticiones
export function useFetchData<T>(url: string) {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setResult(json.data);
      } catch (error: any) {
        setError(error.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { loading, result, error };
}

export function useGetProductAll() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`;
  return useFetchData<ProductType[]>(url); // Reutilizamos el hook genérico
}

export function useGetProductsByTipo(
  tipoProducto: string | string[] | undefined
) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[tipoProducto][$eq]=${tipoProducto}&populate=*`;
  return useFetchData(url); // Reutilizamos el hook genérico
}

export function useGetProductBySlug(slug: string | string[] | undefined) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filters[slug][$eq]=${slug}&populate=*`;
  return useFetchData(url); // Reutilizamos el hook genérico
}

export function useGetCategories() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`;
  return useFetchData<CategoryType[]>(url); // Reutilizamos el hook genérico
}

export function useGetContactInfo() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contactos/?populate=*`;
  return useFetchData(url); // Reutilizamos el hook genérico
}
