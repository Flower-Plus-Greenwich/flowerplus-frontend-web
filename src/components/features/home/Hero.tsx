'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
// import { ArrowRight } from 'lucide-react';

interface TrailPoint {
    id: number;
    x: number;
    y: number;
    age: number;
    maxAge: number;
    size: number;
}

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const [particles, setParticles] = useState<TrailPoint[]>([]);

    const targetMouse = useRef({ x: 0, y: 0 });
    const easedMouse = useRef({ x: 0, y: 0 });
    const particleIdCounter = useRef(0);

    useEffect(() => {
        let animationFrameId: number;

        const render = () => {
            // Easing: move eased position towards target position
            const ease = 0.05;
            easedMouse.current.x += (targetMouse.current.x - easedMouse.current.x) * ease;
            easedMouse.current.y += (targetMouse.current.y - easedMouse.current.y) * ease;

            setParticles(prev => {
                const nextParticles = prev
                    .map(p => ({ ...p, age: p.age + 1, size: p.size * 0.985 }))
                    .filter(p => p.size > 5 && p.age < p.maxAge);

                // Emit new particle if mouse moved
                if (Math.abs(targetMouse.current.x - easedMouse.current.x) > 0.1 ||
                    Math.abs(targetMouse.current.y - easedMouse.current.y) > 0.1) {

                    nextParticles.push({
                        id: particleIdCounter.current++,
                        x: easedMouse.current.x,
                        y: easedMouse.current.y,
                        age: 0,
                        maxAge: 60 + Math.random() * 30,
                        size: 150 + Math.random() * 50
                    });
                }

                return nextParticles.slice(-100); // Limit for performance
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const handleMouseMove = (event: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        targetMouse.current = {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    };

    const HeroContent = ({ isRevealed = false }: { isRevealed?: boolean }) => (
        <div className="container mx-auto px-6">
            <div className="max-w-2xl">
                {/* Tagline */}
                <div className="overflow-hidden mb-4">
                    <span 
                        className={`
                            block text-sm md:text-base tracking-[0.2em] uppercase transition-all duration-300 
                            ${isRevealed ? 'text-white font-bold' : 'text-foreground font-medium'}
                        `}
                    >Welcome to FlowerPlus</span>
                </div>

                {/* Main Title */}
                <h1 className={`
                    text-5xl md:text-7xl lg:text-8xl font-cormorant leading-[1.1] mb-8 transition-all duration-300 
                    ${isRevealed ? 'text-white font-bold' : 'text-foreground font-normal'
                    }`}>
                    Elegance in <br />
                    <span className="italic">Every Petal</span>
                </h1>

                {/* Description */}
                <p className={`
                    text-lg md:text-xl max-w-lg mb-10 leading-relaxed transition-all duration-300 
                    ${isRevealed ? 'text-white font-bold' : 'text-foreground'
                    }`}>
                    Discover our curated collection of exquisite floral arrangements,
                    handcrafted with care and artistry for life&apos;s most precious moments.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                    <Link
                        href="/shop"
                        className={`
                            px-10 py-4 rounded-md transition-all transform hover:-translate-y-1 shadow-lg 
                            ${isRevealed ?
                                'bg-white text-black font-bold' :
                                'bg-primary text-white font-medium hover:bg-primary/90'
                            }`}
                    >
                        Shop Now
                    </Link>
                    <Link
                        href="/collections"
                        className={`
                            px-10 py-4 rounded-md border transition-all transform hover:-translate-y-1 
                            ${isRevealed ?
                                'bg-white/20 border-white text-white font-bold' :
                                'bg-transparent border-primary text-primary font-medium hover:bg-primary/5'
                            }
                        `}
                    >
                        View Collections
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative w-full h-[100vh] min-h-[600px] flex items-center overflow-hidden"
        >
            {/* SVG mask definition */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ position: 'absolute' }}
            >
                <defs>
                    <mask id="hero-reveal-mask">
                        {particles.map(p => (
                            <circle
                                key={p.id}
                                cx={p.x}
                                cy={p.y}
                                r={p.size}
                                fill="white"
                                fillOpacity={Math.max(0, 1 - p.age / p.maxAge)}
                            />
                        ))}
                    </mask>
                </defs>
            </svg>

            {/* BASE LAYER (Dimmed BACKGROUND) */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/home/hero-bg.png"
                    alt="Hero Background"
                    fill
                    priority
                    className="object-cover "
                />
                <div className="absolute inset-0 bg-white/60" />
            </div>

            {/* BASE LAYER CONTENT */}
            <div className="absolute inset-0 z-[1] flex items-center pt-20">
                <HeroContent />
            </div>

            {/* REVEAL LAYER (Z-index higher than base content) */}
            <div
                className="absolute inset-0 z-10"
                style={{
                    mask: 'url(#hero-reveal-mask)',
                    WebkitMask: 'url(#hero-reveal-mask)'
                }}
            >
                {/* Clear Background */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/home/hero-bg.png"
                        alt="Hero Reveal"
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
                {/* Bold Content (Mirrored perfectly) */}
                <div className="absolute inset-0 flex items-center pt-20">
                    <HeroContent isRevealed />
                </div>
            </div>

        </section>
    );
}
