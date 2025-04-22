"use client";

import { useHomeData } from "@/hooks/use-homeData";
import { ReactNode, useEffect } from "react";

interface HydrateProps {
  homeData: any;
  children: ReactNode;
}

export default function HydrateZustand({ homeData, children }: HydrateProps) {
  const setData = useHomeData((state) => state.setData);

  useEffect(() => {
    if (homeData) {
      setData(homeData);
    }
  }, [homeData, setData]);

  return <>{children}</>;
}
