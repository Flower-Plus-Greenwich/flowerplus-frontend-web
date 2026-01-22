'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart } from 'lucide-react';

const PRODUCTS = [
    {
        id: 1,
        category: "Bouquet",
        title: "Garden Romance",
        price: 125,
        image: "/images/home/placeholder.webp"
    },
    {
        id: 2,
        category: "Roses",
        title: "Blushing Roses",
        price: 145,
        image: "/images/home/placeholder.webp"
    },
    {
        id: 3,
        category: "Bridal",
        title: "Pure Elegance",
        price: 165,
        image: "/images/home/placeholder.webp"
    },
    {
        id: 4,
        category: "Seasonal",
        title: "Spring Tulips",
        price: 95,
        image: "/images/home/placeholder.webp"
    },
    {
        id: 5,
        category: "Exotic",
        title: "Orchid Sanctuary",
        price: 185,
        image: "/images/home/placeholder.webp"
    },
    {
        id: 6,
        category: "Bright",
        title: "Golden Sunflowers",
        price: 105,
        image: "/images/home/placeholder.webp"
    },
    {
        id: 7,
        category: "Premium",
        title: "Peony Dreams",
        price: 155,
        image: "/images/home/placeholder.webp"
    },
    {
        id: 8,
        category: "Aromatic",
        title: "Lavender Fields",
        price: 115,
        image: "/images/home/placeholder.webp"
    }
];

export default function Selection() {
    return (
        <section className="w-full py-24 bg-white">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <span className="block text-xs md:text-sm font-medium tracking-[0.3em] text-foreground/50 uppercase mb-4">
                            Our Selection
                        </span>
                        <h2 className="text-4xl md:text-5xl font-cormorant text-foreground">
                            Exquisite Arrangements
                        </h2>
                    </div>
                    <Link
                        href="/shop"
                        className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors border-b border-foreground/20 pb-1"
                    >
                        View All Products
                    </Link>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {PRODUCTS.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-6 bg-muted">
                                <Image
                                    src={product.image}
                                    alt={product.title}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                />

                                {/* Overlay Heart Icon */}
                                <button
                                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-foreground/60 hover:text-red-500 transition-all transform scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100"
                                    aria-label="Add to Favorites"
                                >
                                    <Heart className="w-4 h-4" />
                                </button>

                                {/* Quick View Button Overlay */}
                                <div className="absolute inset-x-4 bottom-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    <button className="w-full py-3 bg-white/90 hover:bg-white text-foreground text-sm font-medium rounded-lg shadow-lg">
                                        Quick View
                                    </button>
                                </div>
                            </div>

                            {/* Product Labels */}
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] tracking-widest uppercase text-foreground/40 font-bold">
                                    {product.category}
                                </span>
                                <h3 className="text-xl font-cormorant text-foreground group-hover:text-primary transition-colors">
                                    {product.title}
                                </h3>
                                <span className="text-base font-light text-foreground/80">
                                    ${product.price}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
