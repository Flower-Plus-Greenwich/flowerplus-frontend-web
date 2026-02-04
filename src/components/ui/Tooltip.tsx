'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    content: string;
}

export default function Tooltip({ children, content }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="
                            absolute top-full mt-2 left-1/2 -translate-x-1/2 
                            px-3 py-1.5 bg-primary/90 text-white text-xs font-medium 
                            rounded-lg shadow-lg whitespace-nowrap z-[100]
                            pointer-events-none
                        "
                    >
                        {content}
                        <div
                            className="
                                absolute bottom-full left-1/2 -translate-x-1/2 
                                border-4 border-transparent border-b-primary
                            "
                        ></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
