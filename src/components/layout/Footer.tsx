"use client";

import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const cormorantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#fbfaf8] border-t border-black/5 pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    {/* Logo & Description */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className={`${cormorantGaramond.className} text-3xl font-medium text-black`}>
                            FlowerPlus
                        </Link>
                        <p className="text-gray-600 max-w-[280px] leading-relaxed">
                            Premium floral arrangements crafted with passion and delivered with care.
                        </p>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h4 className={`${cormorantGaramond.className} text-xl font-medium text-black mb-6`}>Shop</h4>
                        <ul className="flex flex-col gap-4">
                            {["All Flowers", "Bouquets", "Arrangements", "Wedding"].map((item) => (
                                <li key={item}>
                                    <Link href={`/shop?category=${item.toLowerCase().replace(" ", "-")}`} className="text-gray-600 hover:text-black transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* About Links */}
                    <div>
                        <h4 className={`${cormorantGaramond.className} text-xl font-medium text-black mb-6`}>About</h4>
                        <ul className="flex flex-col gap-4">
                            {["Our Story", "Sustainability", "Care Guide", "Contact Us"].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(" ", "-")}`} className="text-gray-600 hover:text-black transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Subscription */}
                    <div>
                        <h4 className={`${cormorantGaramond.className} text-xl font-medium text-black mb-6`}>Stay Connected</h4>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Subscribe to receive exclusive offers and floral inspiration.
                        </p>
                        <form className="flex w-full">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="flex-1 bg-white border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:border-black/20"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-[#635a4d] text-white px-6 py-3 text-sm font-medium hover:bg-[#4d463c] transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} FlowerPlus. All rights reserved.
                    </p>
                    <div className="flex flex-wrap justify-center gap-8">
                        {["Privacy Policy", "Terms of Service", "Shipping", "Staff Login"].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase().replace(" ", "-")}`}
                                className="text-gray-500 hover:text-black text-sm transition-colors whitespace-nowrap"
                            >
                                {item}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
