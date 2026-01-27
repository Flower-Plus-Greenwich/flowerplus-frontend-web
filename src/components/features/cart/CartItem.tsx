'use client';

import React from 'react';
import Image from 'next/image';
import { X, Minus, Plus, Check } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: string, quantity: number) => void;
    onRemove: (id: string) => void;
    onToggleSelect: (id: string) => void;
    isSelected: boolean;
}

export default function CartItem({
    item,
    onUpdateQuantity,
    onRemove,
    onToggleSelect,
    isSelected
}: CartItemProps) {
    return (
        <div className="flex gap-4 p-6 border border-border/60 rounded-sm bg-white hover:border-primary/20 transition-colors relative group">
            {/* Selection Checkbox */}
            <div className="flex items-center">
                <button
                    onClick={() => onToggleSelect(item.id)}
                    className={`
                        w-4 h-4 rounded-sm border transition-colors flex items-center justify-center cursor-pointer
                        ${isSelected ? 'bg-primary border-primary' : 'border-border group-hover:border-primary/40'}
                    `}
                >
                    {isSelected && (
                        <Check className="w-3 h-3 text-white stroke-5" />
                    )}
                </button>
            </div>

            {/* Product Image */}
            <div className="relative w-24 h-24 aspect-square overflow-hidden bg-muted">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                    <h3 className="text-lg font-cormorant text-foreground leading-tight">
                        {item.title}
                    </h3>
                    <p className="text-xs text-foreground/50 font-montserrat uppercase tracking-wider mt-1">
                        {item.category}
                    </p>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center border border-border w-fit mt-4 bg-background">
                    <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 px-2 text-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors"
                        disabled={item.quantity <= 1}
                    >
                        <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 text-sm font-montserrat min-w-[32px] text-center">
                        {item.quantity}
                    </span>
                    <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 px-2 text-foreground/60 hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                        <Plus className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Price and Remove */}
            <div className="flex flex-col items-end justify-between py-1">
                <button
                    onClick={() => onRemove(item.id)}
                    className="text-foreground/40 hover:text-foreground transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                <div className="text-right">
                    <div className="text-lg text-foreground font-montserrat">
                        ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="text-xs text-foreground/40 font-montserrat">
                        ${item.price.toFixed(2)} each
                    </div>
                </div>
            </div>
        </div>
    );
}
