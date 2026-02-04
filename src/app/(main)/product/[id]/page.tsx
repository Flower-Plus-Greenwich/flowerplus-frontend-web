
import ProductGallery from '@/components/features/product/ProductGallery';
import ProductInfo from '@/components/features/product/ProductInfo';
import CustomOrderCTA from '@/components/features/product/CustomOrderCTA';
import ProductReviews from '@/components/features/product/ProductReviews';
import BackBtn from '@/components/common/BackBtn';

import { Suspense } from 'react';
import { getProductDetail } from '@/services/product';

const MOCK_PRODUCT = {
    id: '1',
    category: 'PREMIUM',
    name: 'Pink Peony Dreams',
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

// {
//   id: '803840097485824082',
//   name: 'Bó Hoa Yêu Thương Nồng Cháy',
//   slug: 'bo-hoa-yeu-thuong-nong-chay',
//   description: '99 đóa hồng đỏ thắm tượng trưng cho tình yêu vĩnh cửu.',
//   careInstruction: 'Cắt gốc 45 độ, thay nước mỗi ngày.',
//   basePrice: 1200000,
//   primaryCategory: { id: '803840094134582297', categoryName: 'Tình Yêu' },
//   categories: [
//     { id: '803840094134582297', categoryName: 'Tình Yêu' },
//     { id: '803840094562388332', categoryName: 'Hoa Hồng' }
//   ],
//   status: 'ACTIVE',
//   assets: [
//     {
//       id: '1',
//       url: 'https://placehold.co/600x600?text=Rose+99',
//       publicId: 'seed_98a88257',
//       type: 'IMAGE',
//       isThumbnail: true,
//       position: 0,
//       metaData: null
//     },
//     {
//       id: '2',
//       url: 'https://placehold.co/600x600?text=Rose+Detail',
//       publicId: 'seed_40414484',
//       type: 'IMAGE',
//       isThumbnail: false,
//       position: 1,
//       metaData: null
//     }
//   ],
//   thumbnail: 'https://placehold.co/600x600?text=Rose+99',
//   weight: 500,
//   length: 60,
//   width: 40,
//   height: 20,
//   isSeasonalPriority: null,
//   premakeInstruction: null,
//   isMakeToOrder: false,
//   inStock: true,
//   averageRating: 0,
//   reviewCount: 0
// }

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
