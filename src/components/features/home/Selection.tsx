import { getProducts } from "@/services/product";
import { Suspense } from "react";
import SelectionSkeleton from "./SelectionSkeleton";
import SelectionClient from "./SelectionClient";

export default async function Selection() {
    const products = await getProducts();

    if (!products || products.length === 0) {
        return (
            <section className="w-full py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <p 
                        className="font-cormorant text-4xl font-medium text-gray-600 "
                    >No products available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-24 bg-white">
            <div className="container mx-auto px-6">
                <Suspense fallback={<SelectionSkeleton />}>
                    <SelectionClient products={products} />
                </Suspense>
            </div>
        </section>
    );
}
