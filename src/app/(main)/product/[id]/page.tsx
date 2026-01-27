'use client';

import React from 'react';
import ProductGallery from '@/components/features/product/ProductGallery';
import ProductInfo from '@/components/features/product/ProductInfo';
import CustomOrderCTA from '@/components/features/product/CustomOrderCTA';
import ProductReviews from '@/components/features/product/ProductReviews';

// Mock data based on the provided design
const MOCK_PRODUCT = {
    id: '1',
    category: 'PREMIUM',
    title: 'Pink Peony Dreams',
    price: 110,
    rating: 4.7,
    reviewCount: 3,
    description: 'A stunning arrangement carefully crafted with the finest blooms. Each flower is hand-selected for its beauty and freshness, ensuring a luxurious gift that expresses your sentiments with elegance and grace.',
    details: 'This exquisite arrangement features premium flowers sourced from the finest growers. Each stem is carefully chosen and arranged by our expert florists to create a harmonious composition that captures elegance and sophistication.',
    careInstructions: [
        'Trim stems at an angle and place in fresh water immediately',
        'Keep away from direct sunlight and heat sources',
        'Change water every 2-3 days for optimal freshness',
        'Remove any wilted blooms to extend the life of the arrangement'
    ],
    deliveryInfo: 'Same-day delivery available for orders placed before 2 PM. We ensure each arrangement arrives in perfect condition, beautifully packaged and ready to delight.',
    images: [
        '/images/home/placeholder.webp',
        '/images/home/placeholder.webp',
        '/images/home/placeholder.webp',
    ],
};

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function ProductDetailPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors mb-8 group cursor-pointer"
                >
                    <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-medium">Go Back</span>
                </button>

                {/* Product Detail Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-24 mb-24">
                    <ProductGallery images={MOCK_PRODUCT.images} />
                    <ProductInfo {...MOCK_PRODUCT} />
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
