import { Product } from "./product";

export interface CartItem extends Product {
    quantity: number;
    subcategoryId?: string;
    subcategoryName?: string;
}

export interface CartState {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    total: number;
    voucherCode?: string;
    discount?: number;
}
