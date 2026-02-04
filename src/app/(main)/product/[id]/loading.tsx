import ProductGallerySkeleton from '@/components/features/product/ProductGallerySkeleton';
import ProductInfoSkeleton from '@/components/features/product/ProductInfoSkeleton';

export default function Loading() {
    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6">
                {/* Back Button Placeholder */}
                <div className="mb-8 max-w-[100px]">
                    <div className="h-6 w-20 bg-primary/10 animate-pulse rounded" />
                </div>

                {/* Product Detail Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 mb-24">
                    <ProductGallerySkeleton />
                    <ProductInfoSkeleton />
                </div>

                {/* Custom Order CTA Placeholder */}
                <div className="mb-24 relative w-full h-[400px] overflow-hidden rounded-2xl bg-primary/10 animate-pulse" />

                {/* Reviews Section Placeholder */}
                <div className="w-full h-[300px] bg-primary/10 animate-pulse rounded-xl" />
            </div>
        </main>
    );
}