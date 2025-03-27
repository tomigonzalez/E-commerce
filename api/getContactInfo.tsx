import { useEffect, useState } from "react";

export function useGetContactInfo() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contactos/?populate=*
`;
  const [result, setResult] = useState(null);
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
