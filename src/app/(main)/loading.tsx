import Hero from "@/components/features/home/Hero";
import CollectionsSkeleton from "@/components/features/home/CollectionsSkeleton";
import SelectionSkeleton from "@/components/features/home/SelectionSkeleton";
import QuickCategoriesSkeleton from "@/components/features/home/QuickCategoriesSkeleton";

export default function Loading() {
    return (
        <>
            <Hero />
            <CollectionsSkeleton />
            <SelectionSkeleton />
            <QuickCategoriesSkeleton />
        </>
    );
}