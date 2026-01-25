"use client"

import { useEffect } from "react";
import { isAuthenticated } from "@/lib/auth/tokens";
import Hero from "@/components/features/home/Hero";
import Collections from "@/components/features/home/Collections";
import Selection from "@/components/features/home/Selection";
import QuickCategories from "@/components/features/home/QuickCategories";

export default function Home() {
  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      console.log(auth);
    };
    checkAuth();
  }, []);

  return (
    <>
      <Hero />
      <Collections />
      <Selection />
      <QuickCategories />
    </>
  );
}
