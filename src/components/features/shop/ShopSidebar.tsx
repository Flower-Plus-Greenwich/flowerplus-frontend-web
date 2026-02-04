'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FLOWER_TYPES = ['Roses', 'Tulips', 'Orchids', 'Lilies', 'Sunflowers', 'Hydrangeas'];
const OCCASIONS = ['Birthday', 'Anniversary', 'Wedding', 'Get Well', 'Thank You', 'Congratulations'];

interface FilterSectionProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onToggle: () => void;
}

const FilterSection = ({ title, children, isOpen, onToggle }: FilterSectionProps) => {
    return (
        <div className="border-b border-border py-6 first:pt-0">
            <button
                onClick={onToggle}
                className="w-full flex items-center justify-between text-sm font-medium text-foreground hover:text-primary transition-colors mb-4 group cursor-pointer"
            >
                <span className="font-cormorant text-xl">{title}</span>
                {isOpen ? (
                    <ChevronUp size={18} className="text-foreground/40 group-hover:text-primary transition-colors" />
                ) : (
                    <ChevronDown size={18} className="text-foreground/40 group-hover:text-primary transition-colors" />
                )}
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function ShopSidebar() {
    const [openSections, setOpenSections] = useState<string[]>(['Price Range']);
    const [priceRange, setPriceRange] = useState([26, 200]);

    const toggleSection = (title: string) => {
        setOpenSections((prev) =>
            prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title]
        );
    };

    return (
        <aside className="w-full lg:w-64 flex flex-col gap-8 shrink-0">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-foreground/80 lowercase tracking-widest">Filters</h2>
                <button className="text-xs font-medium text-foreground/40 hover:text-primary transition-colors cursor-pointer capitalize">
                    Clear All
                </button>
            </div>

            <div className="flex flex-col">
                <FilterSection
                    title="Flower Type"
                    isOpen={openSections.includes('Flower Type')}
                    onToggle={() => toggleSection('Flower Type')}
                >
                    <div className="flex flex-col gap-3">
                        {FLOWER_TYPES.map((type) => (
                            <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-4 h-4 border border-border rounded flex items-center justify-center group-hover:border-primary transition-colors">
                                    <div className="w-2 h-2 bg-primary rounded-sm opacity-0" />
                                </div>
                                <span className="text-sm text-foreground/60 group-hover:text-primary transition-colors">
                                    {type}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                <FilterSection
                    title="Occasion"
                    isOpen={openSections.includes('Occasion')}
                    onToggle={() => toggleSection('Occasion')}
                >
                    <div className="flex flex-col gap-3">
                        {OCCASIONS.map((occasion) => (
                            <label key={occasion} className="flex items-center gap-3 cursor-pointer group">
                                <div className="w-4 h-4 border border-border rounded flex items-center justify-center group-hover:border-primary transition-colors">
                                    <div className="w-2 h-2 bg-primary rounded-sm opacity-0" />
                                </div>
                                <span className="text-sm text-foreground/60 group-hover:text-primary transition-colors">
                                    {occasion}
                                </span>
                            </label>
                        ))}
                    </div>
                </FilterSection>

                <FilterSection
                    title="Price Range"
                    isOpen={openSections.includes('Price Range')}
                    onToggle={() => toggleSection('Price Range')}
                >
                    <div className="px-1 pt-2 pb-6">
                        {/* Custom Price Range Slider Visual */}
                        <div className="relative h-1 bg-border rounded-full mb-6">
                            <div
                                className="absolute h-full bg-[#5c4a4a] rounded-full"
                                style={{ left: '10%', right: '15%' }}
                            />
                            <div
                                className="absolute -top-1.5 w-4 h-4 bg-white border-2 border-[#5c4a4a] rounded-full shadow-sm cursor-pointer"
                                style={{ left: '10%' }}
                            />
                            <div
                                className="absolute -top-1.5 w-4 h-4 bg-white border-2 border-[#5c4a4a] rounded-full shadow-sm cursor-pointer"
                                style={{ right: '15%' }}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-foreground/60">${priceRange[0]}</span>
                            <span className="text-xs font-medium text-foreground/60">${priceRange[1]}</span>
                        </div>
                    </div>
                </FilterSection>
            </div>
        </aside>
    );
}
