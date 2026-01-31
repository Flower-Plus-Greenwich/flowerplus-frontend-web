import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionsSkeleton() {
    return (
        <section className="w-full py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header Skeleton */}
                <div className="text-center mb-16 flex flex-col items-center">
                    <Skeleton className="h-4 w-32 mb-4" />
                    <Skeleton className="h-12 w-64 md:w-96" />
                </div>

                {/* Collections Slider Skeleton */}
                <div className="relative mb-16 px-1">
                    <div className="overflow-hidden">
                        <div className="flex gap-6">
                            {/* Show 3 items for desktop match */}
                            {[1, 2, 3].map((item) => (
                                <div
                                    key={item}
                                    className="w-full md:w-1/3 flex-shrink-0"
                                >
                                    <div className="aspect-[4/5] rounded-xl mb-6 overflow-hidden">
                                        <Skeleton className="h-full w-full" />
                                    </div>
                                    <Skeleton className="h-8 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-2/3 mt-1" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Skeleton */}
                <div className="flex items-center justify-center gap-6">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-1 w-32 rounded-full" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>
            </div>
        </section>
    );
}
