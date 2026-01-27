// import ClientWrapper from "@/components/common/ClientWrapper";

import Hero from "@/components/features/home/Hero";
import Collections from "@/components/features/home/Collections";
import Selection from "@/components/features/home/Selection";
import QuickCategories from "@/components/features/home/QuickCategories";
import { getProducts } from "@/services/product";

export default async function Home() {
  const products = await getProducts();
  console.log(products)
  return (
    <>
      <Hero />
      <Collections />
      <Selection />
      <QuickCategories />
    </>
  );
}
