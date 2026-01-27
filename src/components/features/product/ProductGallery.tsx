'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
    images: string[];
}

const variants = {
    enter: (direction: number) => ({
        rotateY: direction > 0 ? 180 : -180,
        opacity: 0,
        z: -200,
    }),
    center: {
        rotateY: 0,
        opacity: 1,
        z: 0,
    },
    exit: (direction: number) => ({
        rotateY: direction > 0 ? -180 : 180,
        opacity: 0,
        z: -200,
    }),
};

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [[page, direction], setPage] = useState([0, 0]);

    const activeIndex = Math.abs(page % images.length);

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl bg-muted group perspective-[1200px] overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={page}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            rotateY: { type: 'spring', stiffness: 500, damping: 200 },
                            opacity: { duration: 0.5 },   
                        }}
                        className="relative w-full h-full"
                        style={{ backfaceVisibility: 'hidden' }}
                    >
                        <Image
                            src={images[activeIndex]}
                            alt={`Product image ${activeIndex + 1}`}
                            fill
                            className="object-cover"
                            priority
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className="
                    absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                ">
                    <button
                        onClick={() => paginate(-1)}
                        className="
                            p-2 rounded-full bg-white/80 backdrop-blur-sm text-foreground 
                            hover:bg-white transition-all shadow-md pointer-events-auto cursor-pointer
                        "
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        onClick={() => paginate(1)}
                        className="
                            p-2 rounded-full bg-white/80 backdrop-blur-sm text-foreground 
                            hover:bg-white transition-all shadow-md pointer-events-auto cursor-pointer
                        "
                        aria-label="Next image"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>

                {/* Image Counter */}
                <div className="
                    absolute bottom-4 right-4 px-3 py-1.5 bg-white/80 backdrop-blur-sm rounded-full 
                    text-xs font-medium text-foreground z-10 transition-transform group-hover:scale-95
                ">
                    {activeIndex + 1} / {images.length}
                </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-4">
                {images.map((img, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            const newDirection = index > activeIndex ? 1 : -1;
                            setPage([index, newDirection]);
                        }}
                        className={`
                            relative w-24 aspect-square rounded-xl overflow-hidden transition-all duration-300
                            ${activeIndex === index ? 'ring-1 ring-primary/80 ring-offset-1' : 'hover:opacity-80'}
                        `}
                    >
                        <Image
                            src={img}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover cursor-pointer"
                            sizes="96px"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
