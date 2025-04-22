import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";

import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import HydrateZustand from "@/components/hydrate-zustand";

const urbanist = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TMGC E-commerce",
  description: "Welcome to my e-commerce from TMGC",
};

export const getHomePageData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/home-pages?populate=*`,
      {
        next: { revalidate: 60 }, // opcional, para ISR
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homeData = await getHomePageData();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${urbanist.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextTopLoader color="#2299DD" height={3} />
          <HydrateZustand homeData={homeData}>
            <NavBar />
            {children}
            <Toaster />
            <Footer />
          </HydrateZustand>
        </ThemeProvider>
      </body>
    </html>
  );
}
