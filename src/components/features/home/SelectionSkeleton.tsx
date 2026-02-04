import { Skeleton } from "@/components/ui/skeleton";

export default function SelectionSkeleton() {
    return (
        <section className="w-full py-24 bg-white">
            <div className="container mx-auto px-6">
                {/* Section Header Skeleton */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <Skeleton className="h-4 w-32 mb-4" />
                        <Skeleton className="h-12 w-64 md:w-96" />
                    </div>
                    <Skeleton className="h-6 w-32" />
                </div>

                {/* Product Grid Skeleton */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {/* Show 8 items placeholder */}
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i}>
                            {/* Image Skeleton */}
                            <div className="aspect-[3/4] rounded-xl mb-6 overflow-hidden">
                                <Skeleton className="h-full w-full" />
                            </div>

                            {/* Text Content Skeleton */}
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-3 w-1/3" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-5 w-1/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
