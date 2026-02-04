'use client';

import React, { useState } from 'react';
import { Star, Minus, Plus, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ClientOnly from '@/components/common/ClientOnly';

interface ProductInfoProps {
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

export default function ProductInfo({
    category = 'Unknown category',
    name = 'No name found',
    price = 0,
    rating = 0,
    reviewCount = 0,
    description = 'No description found',
    details = 'No details found',
    careInstructions = ['No care instructions found'],
    deliveryInfo = 'No delivery info found',
}: ProductInfoProps) {
    console.log(
        {
            category,
            name,
            price,
            rating,
            reviewCount,
            description,
            details,
            careInstructions,
            deliveryInfo,
        }
    )

    const [quantity, setQuantity] = useState(1);
    const [expandedSection, setExpandedSection] = useState<string | null>('details');

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    return (
        <div className="flex flex-col gap-8">
            {/* Header Info */}
            <div>
                <span className="text-sm tracking-widest uppercase text-foreground/60 font-bold mb-2 block">
                    {category}
                </span>
                <h1 className="text-4xl md:text-5xl font-cormorant text-foreground mb-4 font-medium">
                    {name}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                fill={i < Math.floor(rating) ? 'currentColor' : 'none'}
                                className={i < Math.floor(rating) ? '' : 'text-gray-300'}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-foreground/80">
                        {rating} ({reviewCount} reviews)
                    </span>
                </div>
                <div className="text-3xl font-light text-foreground">
                    ${price}
                </div>
            </div>

            {/* Main Description */}
            <p className="text-base text-foreground/80 leading-relaxed font-light">
                {description}
            </p>

            {/* Actions */}
            <div className="space-y-6">
                <div className="flex items-center gap-6">
                    <span className="text-sm font-medium text-foreground/80 w-16">
                        Quantity
                    </span>
                    <div className="flex items-center border border-border rounded-lg overflow-hidden h-12">
                        <ClientOnly>
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="
                                    w-12 h-full flex items-center justify-center 
                                    hover:bg-black/5 transition-colors cursor-pointer
                                "
                            >
                                <Minus size={16} />
                            </button>
                            
                            <div 
                                className="
                                    w-12 h-full flex items-center justify-center text-sm font-medium 
                                    border-x border-border
                            "
                            >
                                {quantity}
                            </div>
                        
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="
                                    w-12 h-full flex items-center justify-center 
                                    hover:bg-black/5 transition-colors cursor-pointer
                                "
                            >
                                <Plus size={16} />
                            </button>
                        </ClientOnly>
                    </div>
                </div>

                <ClientOnly>
                    <button className="
                        w-full py-4 bg-primary text-white text-md font-medium 
                        rounded-xl shadow-xl hover:bg-primary/90 transition-all 
                        transform active:scale-[0.98] cursor-pointer
                    ">
                        Add to Cart
                    </button>
                </ClientOnly>
            </div>

            {/* Collapsible Sections */}
            <div className="border-t border-border mt-4 c">
                {[
                    { id: 'details', label: 'Details', content: details },
                    {
                        id: 'care',
                        label: 'Care Instructions',
                        content: (
                            <ul className="list-disc pl-5 space-y-2">
                                {careInstructions.map((step, i) => (
                                    <li key={i}>{step}</li>
                                ))}
                            </ul>
                        )
                    },
                    { id: 'delivery', label: 'Delivery', content: deliveryInfo },
                ].map((section) => (
                    <div key={section.id} className="border-b border-border">
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full py-5 flex items-center justify-between group cursor-pointer"
                        >
                            <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {section.label}
                            </span>
                            <ChevronDown
                                size={18}
                                className={`transition-transform duration-300 ${expandedSection === section.id ? 'rotate-180' : ''}`}
                            />
                        </button>
                        <AnimatePresence>
                            {expandedSection === section.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-6 text-sm text-foreground leading-relaxed font-light">
                                        {section.content}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
}
