'use client';

import React, { useState } from 'react';
import ShopSidebar from '@/components/features/shop/ShopSidebar';
import ShopProductCard from '@/components/features/shop/ShopProductCard';
import { Product } from '@/types/product';
import { ChevronDown, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        category: 'BOUQUETS',
        title: 'Classic Rose Elegance',
        price: 89,
        image: '/images/home/placeholder.webp'
    },
    {
        id: '2',
        category: 'SEASONAL',
        title: 'Spring Tulip Collection',
        price: 65,
        image: '/images/home/placeholder.webp'
    },
    {
        id: '3',
        category: 'PREMIUM',
        title: 'Exotic Orchid Paradise',
        price: 125,
        image: '/images/home/placeholder.webp'
    },
    {
        id: '4',
        category: 'BOUQUETS',
        title: 'Pink Peony Dreams',
        price: 110,
        image: '/images/home/placeholder.webp'
    },
    {
        id: '5',
        category: 'SEASONAL',
        title: 'Sunlight Sunflower',
        price: 45,
        image: '/images/home/placeholder.webp'
    },
    {
        id: '6',
        category: 'BR bridal',
        title: 'Pure White Wedding',
        price: 180,
        image: '/images/home/placeholder.webp'
    },
    {
        id: '7',
        category: 'BOUQUETS',
        title: 'Midnight Mystery',
        price: 95,
        image: '/images/home/placeholder.webp'
    },
    {
        id: '8',
        category: 'PREMIUM',
        title: 'Golden Lily Vase',
        price: 135,
        image: '/images/home/placeholder.webp'
    },
    {
        id: '9',
        category: 'SEASONAL',
        title: 'Autumn Harvest',
        price: 75,
        image: '/images/home/placeholder.webp'
    }
];

export default function ShopPage() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <main className="min-h-screen pt-32 pb-24">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar - Desktop */}
                    <div className="hidden lg:block">
                        <ShopSidebar />
                    </div>

                    {/* Mobile Filter Trigger */}
                    <div className="lg:hidden flex items-center justify-between mb-8 pb-4 border-b border-border">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="flex items-center gap-2 text-sm font-medium text-foreground/80"
                        >
                            <Filter size={18} />
                            <span>Filters</span>
                        </button>
                        <span className="text-sm text-foreground/40 font-light">
                            {MOCK_PRODUCTS.length} products
                        </span>
                    </div>

                    {/* Mobile Sidebar Overlay (Simple) */}
                    {isSidebarOpen && (
                        <div className="lg:hidden fixed inset-0 z-50 bg-white p-6 overflow-y-auto">
                            <div className="flex justify-between items-center mb-8">
                                <h2 className="text-xl font-medium">Filters</h2>
                                <button onClick={() => setIsSidebarOpen(false)} className="text-primary font-medium">Done</button>
                            </div>
                            <ShopSidebar />
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Top Bar */}
                        <div className="flex items-center justify-between mb-12">
                            <span className="hidden lg:block text-sm text-foreground/40 font-light tracking-wide">
                                Showing {MOCK_PRODUCTS.length} products
                            </span>

                            <div className="flex items-center gap-4 ml-auto">
                                <span className="text-sm text-foreground/60">Sort by:</span>
                                <div className="relative group">
                                    <select className="appearance-none bg-[#fcf9f6] border border-border rounded-xl px-4 py-2 pr-10 text-sm font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary/20 cursor-pointer">
                                        <option>Featured</option>
                                        <option>Price: Low to High</option>
                                        <option>Price: High to Low</option>
                                        <option>Newest</option>
                                    </select>
                                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/40" />
                                </div>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                            {MOCK_PRODUCTS.map((product) => (
                                <ShopProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination (Optional/Visual) */}
                        <div className="mt-20 flex items-center justify-center gap-4">
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white text-sm font-medium shadow-lg">1</div>
                            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-foreground/60 text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-pointer">2</div>
                            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-foreground/60 text-sm font-medium hover:border-primary hover:text-primary transition-colors cursor-pointer">3</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}