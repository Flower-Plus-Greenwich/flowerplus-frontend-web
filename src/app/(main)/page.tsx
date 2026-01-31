
import Hero from "@/components/features/home/Hero";
import Collections from "@/components/features/home/Collections";
import Selection from "@/components/features/home/Selection";
import QuickCategories from "@/components/features/home/QuickCategories";
import { getProducts, getQuickCategoryProductsById } from "@/services/product";
import { getQuickCategoriesData, getCollections } from "@/services/collection";
import { Suspense } from "react";
import CollectionsSkeleton from "@/components/features/home/CollectionsSkeleton";
import SelectionSkeleton from "@/components/features/home/SelectionSkeleton";
import QuickCategoriesSkeleton from "@/components/features/home/QuickCategoriesSkeleton";

export default async function Home() {

  // Get list of collections (categories)
  const collections = await getCollections();

  // Get list of products
  const products = await getProducts();

  // Selected ids of quick categories
  const quickCategoriesIds = ["803840093723525354", "803840094134582297", "804674489444633550"];

  const quickCategories = await getQuickCategoriesData(quickCategoriesIds);

  return (
    <>
      <Hero />

      <Suspense fallback={<CollectionsSkeleton />}>
        <Collections collections={collections} />
      </Suspense>

      <Suspense fallback={<SelectionSkeleton />}>
        <Selection products={products} />
      </Suspense>

      <Suspense fallback={<QuickCategoriesSkeleton />}>
        <QuickCategories
          quickCategories={quickCategories}
        />
      </Suspense>
    </>
  );
}
