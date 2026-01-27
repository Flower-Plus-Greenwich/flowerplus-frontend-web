export interface Product {
    id: string;
    category: string;
    title: string;
    price: number;
    image: string;
}

export interface ProductInfo {
    category: string;
    title: string;
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