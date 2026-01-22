'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, ShoppingBag, Menu, X } from 'lucide-react';
import ClientOnly from '@/components/common/ClientOnly';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'Collections', href: '/collections' },
    { name: 'Your orders', href: '/orders' },
    { name: 'Custom Order', href: '/order/custom' },
];

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-md font-medium text-primary hover:text-black transition-colors tracking-tight"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-5">
                        <button className="text-foreground/80 hover:text-primary transition-colors">
                            <Search size={20} strokeWidth={1.5} />
                        </button>
                        <button className="relative text-foreground/80 hover:text-primary transition-colors">
                            <Bell size={20} strokeWidth={1.5} />
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                2
                            </span>
                        </button>
                        <button className="text-foreground/80 hover:text-primary transition-colors">
                            <ShoppingBag size={20} strokeWidth={1.5} />
                        </button>

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
