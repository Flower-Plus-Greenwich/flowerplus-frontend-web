import { Skeleton } from "@/components/ui/skeleton";

export default function ProductInfoSkeleton() {
    return (
        <div className="flex flex-col gap-8">
            {/* Header Info */}
            <div>
                {/* Category */}
                <Skeleton className="h-4 w-24 mb-2" />

                {/* Title */}
                <Skeleton className="h-12 w-3/4 mb-4" />

                {/* Rating */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} className="h-4 w-4" />
                        ))}
                    </div>
                    <Skeleton className="h-4 w-20" />
                </div>

                {/* Price */}
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>

            {/* Actions */}
            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-12 w-32 rounded-lg" />
                </div>

                <Skeleton className="h-14 w-full rounded-xl" />
            </div>

            {/* Collapsible Sections */}
            <div className="border-t border-border mt-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="border-b border-border py-5 flex justify-between items-center">
                        <Skeleton className="h-5 w-32" />
                        <Skeleton className="h-5 w-5" />
                    </div>
                ))}
            </div>
        </div>
    );
}
