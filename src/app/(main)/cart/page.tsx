'use client';

import React, { useState, useMemo } from 'react';
import BackBtn from '@/components/common/BackBtn';
import CartList from '@/components/features/cart/CartList';
import OrderSummary from '@/components/features/cart/OrderSummary';
import { CartItem } from '@/types/cart';

// Mock data based on the design image
const INITIAL_CART_ITEMS: CartItem[] = [
    {
        id: '1',
        title: 'Pure Elegance',
        category: 'Bridal',
        price: 165.00,
        image: '/images/home/placeholder.webp', // White bouquet
        quantity: 2
    },
    {
        id: '2',
        title: 'Garden Romance',
        category: 'Bouquet',
        price: 125.00,
        image: '/images/home/placeholder.webp', // Colorful bouquet
        quantity: 2
    }
];

export default function CartPage() {
    const [items, setItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
    const [selectedItems, setSelectedItems] = useState<string[]>(INITIAL_CART_ITEMS.map(i => i.id));

    const subtotal = useMemo(() => {
        return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }, [items]);

    const shipping = 0; // Calculated at checkout
    const total = subtotal + shipping;

    const handleUpdateQuantity = (id: string, quantity: number) => {
        setItems(prev => prev.map(item =>
            item.id === id ? { ...item, quantity } : item
        ));
    };

    const handleRemove = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id));
        setSelectedItems(prev => prev.filter(itemId => itemId !== id));
    };

    const handleToggleSelect = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id)
                ? prev.filter(itemId => itemId !== id)
                : [...prev, id]
        );
    };

    const handleToggleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(items.map(i => i.id));
        }
    };

    const handleClearCart = () => {
        setItems([]);
        setSelectedItems([]);
    };

    const handleApplyVoucher = (code: string) => {
        // Implement voucher logic here
    };

    return (
        <main className="container mx-auto min-h-screen bg-background py-20 px-4 md:px-8">
            <div className="flex items-center justify-between mt-4 mb-2">
                <h1 className="text-6xl font-cormorant text-foreground">Cart</h1>
                <BackBtn  />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Cart Items Section */}
                <div className="lg:col-span-8">
                    <CartList
                        items={items}
                        selectedItems={selectedItems}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemove}
                        onToggleSelect={handleToggleSelect}
                        onToggleSelectAll={handleToggleSelectAll}
                        onClearCart={handleClearCart}
                    />
                </div>

                {/* Order Summary Section */}
                <div className="lg:col-span-4">
                    <div className="sticky top-24">
                        <OrderSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            total={total}
                            onApplyVoucher={handleApplyVoucher}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
