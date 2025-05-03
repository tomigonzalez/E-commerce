"use client";

import { useHomeData } from "@/hooks/use-homeData";
import { useInfoData } from "@/hooks/use-info-data";

import { ReactNode, useEffect } from "react";

interface HydrateProps {
  homeData: any;
  infoData: any;
  children: ReactNode;
}

export default function HydrateZustand({
  homeData,
  infoData,
  children,
}: HydrateProps) {
  const setHomeData = useHomeData((state) => state.setData);
  const setInfoData = useInfoData((state) => state.setData);

  useEffect(() => {
    if (homeData) setHomeData(homeData);
    if (infoData) setInfoData(infoData);
  }, [homeData, infoData, setHomeData, setInfoData]);

  return <>{children}</>;
}
