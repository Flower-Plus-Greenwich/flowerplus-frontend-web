
import ProductGallery from '@/components/features/product/ProductGallery';
import ProductInfo from '@/components/features/product/ProductInfo';
import CustomOrderCTA from '@/components/features/product/CustomOrderCTA';
import ProductReviews from '@/components/features/product/ProductReviews';
import BackBtn from '@/components/common/BackBtn';

import { Suspense } from 'react';
import { getProductDetail } from '@/services/product';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let product = await getProductDetail(id);

    const productImages = product.assets?.map((asset: { url: string }) => asset.url) || [];

    // console.log(product);
    product = {
        ...product,
        category: product?.primaryCategory?.categoryName || "No category found",
        careInstructions: product?.careInstruction?.split(', ') || [],
        price: product?.basePrice || 0,
        rating: product?.averageRating || 0,
        reviewCount: product?.reviewCount || 0,
        description: product?.description || "No description found",
        details: product?.premakeInstruction || "No details found",
        deliveryInfo: product?.deliveryInfo || "No delivery info found",
    }

    // console.log(product);

    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6">
                {/* Back Button */}
                <BackBtn />

                {/* Product Detail Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 mb-24">
                    <Suspense fallback={<div>Loading product gallery...</div>}>
                        <ProductGallery images={productImages} />
                    </Suspense>

                    <Suspense fallback={<div>Loading product info...</div>}>
                        <ProductInfo {...product} />
                    </Suspense>
                </div>

                {/* Custom Order CTA */}
                <div className="mb-24">
                    <CustomOrderCTA />
                </div>

                {/* Reviews Section */}
                <div className="max-w-screen">
                    <ProductReviews />
                </div>
            </div>
        </main>
    );
}
