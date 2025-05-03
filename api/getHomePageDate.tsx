export const getHomePageData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home-pages?populate=*`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch");

    const json = await res.json();

    return json.data;
  } catch (error) {
    console.error("Error fetching home page data", error);
    return null;
  }
};
