import { useEffect, useState } from "react";

export function useGetCategories() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`;
  const [categorys, setCategorys] = useState(null);
  const [loadingg, setLoadingg] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        const json = await res.json();
        setCategorys(json.data);
      } catch (error: any) {
        setError(error.message || "Error fetching data");
      } finally {
        setLoadingg(false);
      }
    };

    fetchData();
  }, [url]);

  return { loadingg, categorys, error };
}
