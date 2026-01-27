'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Palette } from 'lucide-react';

export default function CustomOrderCTA() {
    return (
        <section className="
            relative w-full py-16 px-6 bg-primary/5 rounded-3xl 
            border border-border/50 text-center overflow-hidden
        ">
            {/* Background Art */}
            <div className="absolute inset-0 left-[-78%] bottom-[-30%] z-0 opacity-[0.35] pointer-events-none">
                <Image
                    src="/images/product/cta-bg.png"
                    alt="Floral Background"
                    fill
                    className="object-contain rotate-30"
                />
            </div>

            <div className="absolute inset-0 right-[-72%] top-[-30%] z-0 opacity-[0.2] pointer-events-none">
                <Image
                    src="/images/product/cta-bg.png"
                    alt="Floral Background"
                    fill
                    className="object-contain scale-170 rotate-200"
                />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
                <Palette size={60} className="text-primary mb-4" />
                {/* <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
                </div> */}

                <h2 className="text-3xl md:text-4xl font-cormorant text-foreground mb-4 font-medium">
                    Not what you&apos;re looking for?
                </h2>

                <p className="text-base text-foreground/80 leading-relaxed font-light mb-8 max-w-lg">
                    Design your perfect arrangement with our custom order builder. Choose your
                    flowers, vase, colors, and style to create something truly unique.
                </p>

                <Link
                    href="/order/custom"
                    className="px-8 py-3.5 bg-primary text-white text-sm font-medium rounded-lg shadow-lg hover:bg-primary/90 transition-all transform hover:-translate-y-1 active:scale-[0.98]"
                >
                    Create Custom Order
                </Link>
            </div>
        </section>
    );
}
