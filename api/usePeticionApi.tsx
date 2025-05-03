import { CategoryType, ProductType } from "@/types/product";
import { useEffect, useState } from "react";

export function useFetchData<T>(url: string) {
  const [result, setResult] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      try {
        const res = await fetch(url, { signal });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setResult(json.data);
      } catch (error: any) {
        if (error.name === "AbortError") {
          // La petición fue cancelada, no hacer nada
        } else {
          setError(error.message || "Error fetching data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
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

export function useGetCategories() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`;
  return useFetchData<CategoryType[]>(url); // Reutilizamos el hook genérico
}
