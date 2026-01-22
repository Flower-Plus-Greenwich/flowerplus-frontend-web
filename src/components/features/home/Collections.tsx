'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const COLLECTIONS = [
    {
        id: 1,
        title: "Orchid Paradise",
        description: "Exotic orchids for sophisticated elegance",
        image: "/images/home/placeholder.webp"
    },
    {
        id: 2,
        title: "Sunshine Collection",
        description: "Bright and cheerful sunflower arrangements",
        image: "/images/home/placeholder.webp"
    },
    {
        id: 3,
        title: "Premium Bouquets",
        description: "Handcrafted luxury arrangements",
        image: "/images/home/placeholder.webp"
    },
    {
        id: 4,
        title: "Spring Bloom",
        description: "Fresh seasonal flowers from our gardens",
        image: "/images/home/placeholder.webp"
    },
    {
        id: 5,
        title: "Graceful Lilies",
        description: "Pure and elegant lily compositions",
        image: "/images/home/placeholder.webp"

    }
];

export default function Collections() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Handle responsive state for slider logic
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const totalItems = COLLECTIONS.length;
    const visibleCards = isMobile ? 1 : 3;
    const maxIndex = totalItems - visibleCards;

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    return (
        <section className="w-full py-24 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="block text-xs md:text-sm font-medium tracking-[0.3em] text-primary uppercase mb-4">
                        Explore Our
                    </span>
                    <h2 className="text-4xl md:text-5xl font-cormorant text-black font-medium">
                        Featured Collections
                    </h2>
                </div>

                {/* Collections Slider Container */}
                <div className="relative mb-16 px-1">
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
                            }}
                        >
                            {COLLECTIONS.map((item) => (
                                <div
                                    key={item.id}
                                    className="w-full md:w-1/3 flex-shrink-0 px-3 md:px-4"
                                >
                                    <div className="group cursor-pointer">
                                        {/* Image Container */}
                                        <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-6 bg-muted">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                fill
                                            />
                                        </div>

                                        {/* Text Content */}
                                        <h3 className="text-2xl font-cormorant font-medium text-foreground mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm font-medium text-foreground leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center justify-center gap-6">
                    <button
                        onClick={prevSlide}
                        className="p-2.5 rounded-full border border-black/10 hover:bg-black/5 transition-colors group"
                        aria-label="Previous Collection"
                    >
                        <ChevronLeft className="w-4 h-4 text-black/40 group-hover:text-black/80" />
                    </button>

                    {/* Progress Dots */}
                    <div className="flex items-center gap-2">
                        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                            <div
                                key={idx}
                                className={`
                                    h-[3px] rounded-full transition-all duration-500 
                                    ${idx === currentIndex ? 'w-10 bg-[#5c4a4a]' : 'w-2 bg-black/10'}
                                `}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextSlide}
                        className="p-2.5 rounded-full border border-black/10 hover:bg-black/5 transition-colors group"
                        aria-label="Next Collection"
                    >
                        <ChevronRight className="w-4 h-4 text-black/40 group-hover:text-black/80" />
                    </button>
                </div>
            </div>
        </section>
    );
}