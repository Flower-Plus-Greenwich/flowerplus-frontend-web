'use client';

import Image from "next/image";
import Link from "next/link";
import ClientOnly from "@/components/common/ClientOnly";
import { motion, Easing } from "framer-motion";
import { QuickCategory } from "@/types/collection";

const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: "easeOut" as Easing }
    }
};

const staggerContainer = {
    initial: {},
    animate: {
        transition: { staggerChildren: 0.1 }
    }
};

function QuickCategoryItem({ category }: { category: QuickCategory }) {
    const products = category.products.slice(0, 3);

    // console.log(products.length);

    if (products.length === 0) return (
        <div className="mb-20">
            <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
            >
                <div>
                    <h2
                        className="text-4xl md:text-5xl font-cormorant text-black font-medium mb-2"
                    >{category.title}</h2>
                    <p className="text-gray-600">{category.description}</p>
                </div>

                <ClientOnly>
                    <Link
                        href={`/shop?category=${category.slug}`}
                        className="
                        group flex items-center gap-2 text-sm font-medium 
                        tracking-widest uppercase text-foreground/80 hover:text-primary 
                        transition-colors duration-300 cursor-pointer"
                    >
                        View all products
                        <span className="w-8 h-[1px] bg-foreground/20 group-hover:bg-primary group-hover:w-12 transition-all duration-300" />
                    </Link>
                </ClientOnly>
            </motion.div>

            <p>No products found</p>
        </div>
    );

    return (
        <div className="mb-20">
            <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
            >
                <div>
                    <h2
                        className="text-4xl md:text-5xl font-cormorant text-black font-medium mb-2"
                    >{category.title}</h2>
                    <p className="text-gray-600">{category.description}</p>
                </div>

                <ClientOnly>
                    <Link
                        href={`/shop?category=${category.slug}`}
                        className="
                        group flex items-center gap-2 text-sm font-medium 
                        tracking-widest uppercase text-foreground/80 hover:text-primary 
                        transition-colors duration-300 cursor-pointer"
                    >
                        View all products
                        <span className="w-8 h-[1px] bg-foreground/20 group-hover:bg-primary group-hover:w-12 transition-all duration-300" />
                    </Link>
                </ClientOnly>
            </motion.div>

            <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {category.products.map((product) => (
                    <motion.div
                        key={product.id}
                        variants={fadeInUp}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[3/4] overflow-hidden rounded-xl mb-4 bg-muted">
                            <Image
                                src={product.thumbnail || "/images/home/placeholder.webp"}
                                alt={product.name}
                                fill
                                unoptimized
                                className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] tracking-widest uppercase text-foreground/40 font-bold">
                                {product.categoryName}
                            </span>
                            <h3 className="text-xl font-cormorant text-foreground group-hover:text-primary transition-colors">
                                {product.name}
                            </h3>
                            <span className="text-base font-light text-foreground/80">
                                ${product.price}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default function QuickCategorySection({
    quickCategories
}: {
    quickCategories: QuickCategory[];
}) {
    if (!quickCategories || quickCategories.length === 0) {
        return (
            <section className="w-full py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-gray-500">No quick categories found.</p>
                </div>
            </section>
        );
    }

    return (
        <section className="w-full py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className=" mt-12">
                    {quickCategories.map((category) => (
                        <QuickCategoryItem key={category.id} category={category} />
                    ))}
                </div>
            </div>
        </section>
    );
}
