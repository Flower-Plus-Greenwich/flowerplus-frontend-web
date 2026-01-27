'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import { motion } from 'framer-motion';

interface ShopProductCardProps {
    product: Product;
}

export default function ShopProductCard({ product }: ShopProductCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="group"
        >
            <Link href={`/product/${product.id}`} className="block">
                {/* Image Wrapper */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl mb-4 bg-muted">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 font-bold">
                        {product.category}
                    </span>
                    <h3 className="text-xl font-cormorant text-foreground group-hover:text-primary transition-colors leading-tight">
                        {product.title}
                    </h3>
                    <span className="text-base font-light text-foreground/80 mt-1">
                        ${product.price}
                    </span>
                </div>
            </Link>
        </motion.div>
    );
}
