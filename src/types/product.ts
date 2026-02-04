export interface Product {
    id: string;
    categoryName: string;
    name: string;
    price: number;
    thumbnail: string;
    image: string;
}

export interface ProductInfo {
    category: string;
    name: string;
    price: number;
    rating: number;
    reviewCount: number;
    description: string;
    details: string;
    careInstructions: string[];
    deliveryInfo: string;
}

export interface Review {
    id: number;
    userName: string;
    rating: number;
    date: string;
    content: string;
    isVerified: boolean;
}