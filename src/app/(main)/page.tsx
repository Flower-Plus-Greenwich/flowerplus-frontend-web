import Hero from "@/components/features/home/Hero";
import Collections from "@/components/features/home/Collections";
import Selection from "@/components/features/home/Selection";
import QuickCategories from "@/components/features/home/QuickCategories";

export default function Home() {
  return (
    <>
      <Hero />
      <Collections />
      <Selection />
      <QuickCategories />
    </>
  );
}
