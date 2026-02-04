import { Skeleton } from "@/components/ui/skeleton";

export default function ProductGallerySkeleton() {
    return (
        <div className="flex flex-col gap-6">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Skeleton className="w-full h-full" />
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="relative w-24 aspect-square rounded-xl overflow-hidden">
                        <Skeleton className="w-full h-full" />
                    </div>
                ))}
            </div>
        </div>
    );
}
