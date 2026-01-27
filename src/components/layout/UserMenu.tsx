'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Heart, Globe } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { isAuthenticated } from "@/lib/tokens";

interface UserMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const menuItems = [
    {
        label: 'Sign In / Sign Up',
        href: '/login',
        icon: User,
    },
    {
        label: 'Wishlist',
        href: '/wishlist',
        icon: Heart,
    },
    {
        label: 'Language: English',
        href: '#',
        icon: Globe,
    },
];

export default function UserMenu({ isOpen, onClose }: UserMenuProps) {

    // Check if user is authenticated
    useEffect(() => {
        const checkAuth = async () => {
            const auth = await isAuthenticated();
            if (auth) {
                menuItems[0].label = 'Your profile';
                menuItems[0].href = '/profile';
            }
        };
        checkAuth();
    }, []);

    const menuRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Close on escape key
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onClose]);


    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/10 backdrop-blur-[2px] z-[60]"
                        onClick={onClose}
                    />

                    {/* Menu Popup */}
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="fixed top-20 right-6 w-[320px] bg-white rounded-2xl shadow-2xl z-[70] overflow-hidden border border-border"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-cormorant font-medium text-foreground">
                                    Menu
                                </h3>
                                <button
                                    onClick={onClose}
                                    className="p-1 hover:bg-black/5 rounded-full transition-colors cursor-pointer"
                                >
                                    <X size={20} className="text-foreground" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                {menuItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={onClose}
                                        className="flex items-center gap-4 p-3 hover:bg-black/5 rounded-xl transition-all group"
                                    >
                                        <div className="w-10 h-10 flex items-center justify-center bg-input-bg">
                                            <item.icon size={20} className="text-primary" />
                                        </div>
                                        <span className="text-[15px] font-medium text-foreground group-hover:text-primary transition-colors">
                                            {item.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
