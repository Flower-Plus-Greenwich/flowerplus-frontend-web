'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Heart, Globe, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from "@/lib/tokens";
import { logoutAction } from "@/actions/auth";
import { toast } from 'sonner';

interface UserMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UserMenu({ isOpen, onClose }: UserMenuProps) {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    interface MenuItem {
        label: string;
        href: string;
        icon: any;
        onClick?: (e: React.MouseEvent) => void;
    }

    // Construct menu items based on state
    const menuItems: MenuItem[] = [
        {
            label: isLoggedIn ? 'Your profile' : 'Sign In / Sign Up',
            href: isLoggedIn ? '/profile' : '/login',
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

    // Check if user is authenticated
    useEffect(() => {
        const checkAuth = async () => {
            const auth = await isAuthenticated();
            setIsLoggedIn(auth);
        };

        if (isOpen) {
            checkAuth()
        }
    }, [isOpen]);
    
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

    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await logoutAction();
            setIsLoggedIn(false);
            toast.success('Logout successful');
            onClose();
            router.refresh();
            router.push('/');
        } catch (error) {
            console.error("Logout failed", error);
            toast.error('Logout failed');
        }
    };

    if (isLoggedIn) {
        menuItems.push({
            label: 'Sign Out',
            href: '#',
            icon: LogOut,
            onClick: handleLogout,
        });
    }


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
                                {menuItems.map((item) => {
                                    const Component = item.onClick ? 'button' : Link;
                                    const props: any = {
                                        href: !item.onClick ? item.href : undefined,
                                        className: `
                                            flex items-center w-full gap-4 p-3 hover:bg-black/5 
                                            rounded-xl transition-all group text-left cursor-pointer`,
                                        onClick: item.onClick ? item.onClick : onClose,
                                    };


                                    return (
                                        <Component 
                                            key={item.label} 
                                            {...props}
                                        >
                                            <div className={`
                                                w-10 h-10 flex items-center justify-center bg-input-bg rounded-lg
                                                ${item.onClick ? 'text-red-500' : 'text-primary'}
                                            `}>
                                                <item.icon size={20} />
                                            </div>
                                            <span className={
                                                `text-[15px] font-medium text-foreground transition-colors 
                                                ${item.onClick ? 
                                                    'text-red-500 group-hover:text-red-500 ' : 
                                                    'text-primary group-hover:text-primary '
                                                }`
                                            }>
                                                {item.label}
                                            </span>
                                        </Component>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
