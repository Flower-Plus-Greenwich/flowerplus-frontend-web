'use client';

import React from 'react';
import CartItem from './CartItem';
import { CartItem as CartItemType } from '@/types/cart';
import { Check } from 'lucide-react';

interface CartListProps {
    items: CartItemType[];
    selectedItems: string[];
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
    onToggleSelect: (id: string) => void;
    onToggleSelectAll: () => void;
    onClearCart: () => void;
}

export default function CartList({
    items,
    selectedItems,
    onUpdateQuantity,
    onRemove,
    onToggleSelect,
    onToggleSelectAll,
    onClearCart
}: CartListProps) {
    const isAllSelected = items.length > 0 && selectedItems.length === items.length;

    return (
        <div className="flex flex-col gap-4">
            {/* Header / Bulk Actions */}
            <div className="flex justify-between items-center px-2 py-2">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleSelectAll}
                        className={`
                            w-4 h-4 rounded-sm border transition-colors flex items-center justify-center cursor-pointer 
                            ${isAllSelected ? 'bg-primary border-primary' : 'border-border hover:border-primary/40'}
                        `}
                    >
                        {isAllSelected && (
                            <Check className="w-3 h-3 text-white stroke-5" />
                        )}
                    </button>
                    <span className="text-sm text-foreground/80 font-montserrat">
                        Select All ({items.length})
                    </span>
                </div>
                <button
                    onClick={onClearCart}
                    className="text-sm text-red-500 hover:text-red-600 font-montserrat transition-colors cursor-pointer"
                >
                    Clear Cart
                </button>
            </div>

            <hr className="border-border border-t-2" />

            {/* Items List */}
            <ul className="flex flex-col gap-4">
                {items.length === 0 ? (
                    <li
                        className="
                            py-20 text-center border border-dashed border-border 
                            rounded-sm bg-white/50
                        "
                    >
                        <p className="text-foreground font-montserrat">Your cart is empty</p>
                    </li>
                ) : (
                    items.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            isSelected={selectedItems.includes(item.id)}
                            onUpdateQuantity={onUpdateQuantity}
                            onRemove={onRemove}
                            onToggleSelect={onToggleSelect}
                        />
                    ))
                )}
            </ul>
        </div>
    );
}
