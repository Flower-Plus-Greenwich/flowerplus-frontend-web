import { Suspense } from "react";
import QuickCategoriesSkeleton from "./QuickCategoriesSkeleton";
import { QuickCategoriesClient } from "./QuickCategoriesClient";
import { getQuickCategoriesData } from "@/services/collection";

export default async function QuickCategorySection() {
  // Selected ids for quick categories
  const quickCategoriesIds = [
    "803840093723525354", // Birthday
    "803840094134582297", // Valentine
    "804674489444633550" // Wedding
  ];

  const quickCategories = await getQuickCategoriesData(quickCategoriesIds);
  
    if (!quickCategories || quickCategories.length === 0) {
        return (
            <section className="w-full py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-500">No quick categories found.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className=" mt-12">
                  <Suspense fallback={<QuickCategoriesSkeleton />}>
                    {quickCategories.map((category) => (
                      <QuickCategoriesClient
                        key={category.id}
                        category={category}
                      />
                    ))}
                  </Suspense>
                </div>
            </div>
        </section>
    );
}
