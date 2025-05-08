import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navBar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import HydrateZustand from "@/components/hydrate-zustand";
import { getHomePageData } from "@/api/getHomePageDate";
import { useGetInfo } from "@/api/getInfo";
import { InfoDataType } from "@/types/info";
import AOSInit from "@/components/aosInit";

const urbanist = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TMGC E-commerce",
  description: "Welcome to my e-commerce from TMGC",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const homeData = await getHomePageData();
  const infoData: InfoDataType[] = await useGetInfo();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${urbanist.className} antialiased`}>
        <AOSInit />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextTopLoader color="#2299DD" height={3} />
          <HydrateZustand homeData={homeData} infoData={infoData}>
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
