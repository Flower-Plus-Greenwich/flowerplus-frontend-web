import { dataFetcher } from "@/lib/fetcher";

export async function getProducts() {
    // const response = await dataFetcher(`${process.env.BACKEND_URL}/products?page=1&size=20&sort=newest`, {
    //     revalidate: 60,
    // });

    // const data = await response?.json();
    const data = {
        "data": [
            {
            "id": "803478103184233402",
            "name": "Nàng Thơ Mộng Mơ",
            "slug": "nang-tho-mong-mo",
            "price": 850000.00,
            "categoryName": "Sinh Nhật",
            "categories": [
                {
                "id": "803478102647372116",
                "categoryName": "Sinh Nhật"
                },
                {
                "id": "803478102685109607",
                "categoryName": "Hoa Tulip"
                }
            ],
            "thumbnail": "https://placehold.co/600x600?text=Tulip+Pink",
            "availableStock": 10,
            "inStock": true,
            "averageRating": 0.0,
            "reviewCount": 0
            },
            {
            "id": "803478102764812471",
            "name": "Bó Hoa Yêu Thương Nồng Cháy",
            "slug": "bo-hoa-yeu-thuong-nong-chay",
            "price": 1200000.00,
            "categoryName": "Tình Yêu",
            "categories": [
                {
                "id": "803478102655757330",
                "categoryName": "Tình Yêu"
                },
                {
                "id": "803478102676724368",
                "categoryName": "Hoa Hồng"
                }
            ],
            "thumbnail": "https://placehold.co/600x600?text=Rose+99",
            "availableStock": 10,
            "inStock": true,
            "averageRating": 0.0,
            "reviewCount": 0
            },
            {
            "id": "792254090444995412",
            "name": "Red Rose Bouquet",
            "slug": "red-rose-bouquet",
            "price": 450000.00,
            "categoryName": null,
            "categories": [],
            "thumbnail": "https://cdn.flowerplus.com/products/red-rose.jpg",
            "availableStock": 50,
            "inStock": true,
            "averageRating": 4.8,
            "reviewCount": 124
            },
            {
            "id": "792254090444995413",
            "name": "White Lily Elegance",
            "slug": "white-lily-elegance",
            "price": 520000.00,
            "categoryName": null,
            "categories": [],
            "thumbnail": "https://cdn.flowerplus.com/products/white-lily.jpg",
            "availableStock": 30,
            "inStock": true,
            "averageRating": 4.6,
            "reviewCount": 89
            },
            {
            "id": "792254090444995414",
            "name": "Sunflower Happiness Box",
            "slug": "sunflower-happiness-box",
            "price": 390000.00,
            "categoryName": null,
            "categories": [],
            "thumbnail": "https://cdn.flowerplus.com/products/sunflower-box.jpg",
            "availableStock": 0,
            "inStock": true,
            "averageRating": 4.7,
            "reviewCount": 56
            },
            {
            "id": "792254090444995416",
            "name": "Luxury Wedding Arrangement",
            "slug": "luxury-wedding-arrangement",
            "price": 3500000.00,
            "categoryName": null,
            "categories": [],
            "thumbnail": "https://cdn.flowerplus.com/products/wedding-arrangement.jpg",
            "availableStock": 0,
            "inStock": true,
            "averageRating": 4.9,
            "reviewCount": 37
            }
        ],
        "pagination": {
            "page": 1,
            "size": 20,
            "totalElements": 6,
            "totalPages": 1
        }
    };
    
    console.log("Products: ", data);

    return data || [];
}
