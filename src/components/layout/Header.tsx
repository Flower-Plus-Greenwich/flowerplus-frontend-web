'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Bell, ShoppingCart, Menu, X } from 'lucide-react';
import ClientOnly from '@/components/common/ClientOnly';
import UserMenu from './UserMenu';
import Tooltip from '@/components/ui/Tooltip';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections' },
    { name: 'Your orders', href: '/orders' },
    { name: 'Custom Order', href: '/order/custom' },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header
            className={`
                fixed top-0 left-0 right-0 z-50 transition-all duration-300 
                bg-white/80 backdrop-blur-md shadow-sm py-4
            `}
        >
            <div className="container mx-auto px-6 h-full">
                <div className="flex items-center justify-between gap-4">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <h1 className="text-2xl md:text-3xl font-cormorant font-semibold tracking-wide text-foreground">
                            FlowerPlus
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`
                                        transition-all duration-300 tracking-tight
                                        ${isActive
                                            ? 'text-lg font-bold text-primary'
                                            : 'text-md font-medium text-primary hover:text-black'
                                        }
                                    `}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        <Tooltip content="Search">
                            <ClientOnly>
                                <button
                                    className="
                                        text-primary rounded-full p-2 hover:bg-primary/8
                                        hover:text-foreground/80 transition-colors duration-300 cursor-pointer
                                    "
                                >
                                    <Search size={20} strokeWidth={2} />
                                </button>
                            </ClientOnly>
                        </Tooltip>

                        <Tooltip content="Notifications">
                            <ClientOnly>
                                <button className="
                                    relative text-primary rounded-full p-2 hover:bg-primary/8
                                    hover:text-foreground/80 hover:text-primary/60 transition-colors duration-300 cursor-pointer
                                ">
                                    <Bell size={20} strokeWidth={2} />
                                        <span
                                            className="
                                                absolute -top-[1px] -right-[1px] bg-primary text-white text-[10px] 
                                                w-4 h-4 rounded-full flex items-center justify-center font-bold
                                        ">2</span>

                                </button>
                            </ClientOnly>
                        </Tooltip>

                        <Tooltip content="Cart">
                            <ClientOnly>
                                <Link href="/cart" className="
                                    rounded-full p-2 hover:bg-primary/8 hover:text-foreground/80 
                                    hover:text-primary/60 transition-colors duration-300 cursor-pointer
                                ">
                                    <ShoppingCart size={20} strokeWidth={2} />
                                </Link>
                            </ClientOnly>
                        </Tooltip>

                        <Tooltip content="Menu">
                            <ClientOnly>
                                <button
                                    onClick={() => setIsUserMenuOpen(true)}
                                    className="
                                        rounded-full p-2 hover:bg-primary/8
                                        hover:text-foreground/80 hover:text-primary/60 transition-colors duration-300 cursor-pointer
                                    "
                                >
                                    <Menu size={20} strokeWidth={2} />
                                </button>
                            </ClientOnly>
                        </Tooltip>

                        <UserMenu
                            isOpen={isUserMenuOpen}
                            onClose={() => setIsUserMenuOpen(false)}
                        />

                        {/* Mobile Menu Toggle */}
                        <button
                            className="lg:hidden text-primary hover:text-black transition-colors"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 bg-white z-[60] flex flex-col p-8 transition-transform duration-300">
                    <div className="flex justify-between items-center mb-12">
                        <h2 className="text-2xl font-cormorant font-bold uppercase tracking-widest text-primary">FlowerPlus</h2>
                        <button onClick={() => setIsMobileMenuOpen(false)}>
                            <X size={28} className="text-foreground" />
                        </button>
                    </div>
                    <nav className="flex flex-col gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="
                                    text-2xl font-cormorant text-primary hover:text-black 
                                    transition-colors border-b border-border pb-2 cursor-pointer"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}
