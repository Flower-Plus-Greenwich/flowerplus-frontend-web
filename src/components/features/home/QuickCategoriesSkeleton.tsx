import { Skeleton } from "@/components/ui/skeleton";

export default function QuickCategoriesSkeleton() {
    return (
        <section className="w-full py-24 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="mt-12">
                    {/* Simulate 3 quick categories */}
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="mb-20">
                            {/* Category Header Skeleton */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                                <div>
                                    <Skeleton className="h-10 md:h-12 w-48 md:w-64 mb-2" />
                                    <Skeleton className="h-4 w-72 md:w-96" />
                                </div>
                                <Skeleton className="h-5 w-40" />
                            </div>

                            {/* Category Products Grid Skeleton */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {Array.from({ length: 3 }).map((_, j) => (
                                    <div key={j}>
                                        <div className="aspect-[3/4] rounded-xl mb-4 overflow-hidden">
                                            <Skeleton className="h-full w-full" />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Skeleton className="h-3 w-24" />
                                            <Skeleton className="h-6 w-48" />
                                            <Skeleton className="h-5 w-16" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
