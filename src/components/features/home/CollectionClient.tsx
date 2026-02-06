'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, Easing } from 'framer-motion';
import ClientOnly from '@/components/common/ClientOnly';
import { Collection } from '@/types/collection';

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
        transition: { staggerChildren: 0.2 }
    }
};

export function CollectionClient({ collections }: { collections: Collection[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive state for slider logic
  useEffect(() => {
      const checkMobile = () => {
          setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalItems = collections.length;
  const visibleCards = isMobile ? 1 : 3;
  const maxIndex = totalItems - visibleCards;

  const nextSlide = () => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
      setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };
  
  return (
    <>
      {/* Header */}
      <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
      >
        <span className="block text-xs md:text-sm font-medium tracking-[0.3em] text-primary uppercase mb-4">
            Explore Our
        </span>
        <h2 className="text-4xl md:text-5xl font-cormorant text-black font-medium">
            Featured Collections
        </h2>
      </motion.div>
      
      {/* Collection slider */}
      <div className="relative mb-16 px-1">
          <div className="overflow-hidden">
              <motion.div
                  variants={staggerContainer}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  className="flex transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)"
                  style={{
                      transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`
                  }}
              >
                  {collections.map((item) => (
                      <motion.div
                          key={item.id}
                          variants={fadeInUp}
                          className="w-full md:w-1/3 shrink-0 px-3 md:px-4"
                      >
                          <div className="group cursor-pointer">
                              {/* Image Container */}
                              <div className="relative aspect-4/5 overflow-hidden rounded-xl mb-6 bg-muted">
                                  <Image
                                      src={item.thumbnail || '/images/home/placeholder.webp'}
                                      alt={item.name}
                                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                      fill
                                      loading="eager"
                                  />
                              </div>

                              {/* Text Content */}
                              <h3 className="text-2xl font-cormorant font-medium text-foreground mb-2">
                                  {item.name}
                              </h3>
                              <p className="text-sm font-medium text-foreground leading-relaxed">
                                  {item.description}
                              </p>
                          </div>
                      </motion.div>
                  ))}
              </motion.div>
          </div>
      </div>
      
      {/* Navigation controls */}
      <div className="flex items-center justify-center gap-6">
          <ClientOnly>
              <button
                  onClick={prevSlide}
                  className="
                      p-2.5 rounded-full border border-black/10 hover:bg-black/5 
                      transition-colors group cursor-pointer"
                  aria-label="Previous Collection"
              >
                  <ChevronLeft className="w-4 h-4 text-black/40 group-hover:text-black/80" />
              </button>
          </ClientOnly>
  
          {/* Progress Dots */}
          <div className="flex items-center gap-2">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <div
                      key={index}
                      className={`
                          h-0.75 rounded-full transition-all duration-500 
                          ${index === currentIndex ? 'w-10 bg-[#5c4a4a]' : 'w-2 bg-black/10'}
                      `}
                  />
              ))}
          </div>
  
          <ClientOnly>
              <button
                  onClick={nextSlide}
                  className="
                      p-2.5 rounded-full border border-black/10 hover:bg-black/5 
                      transition-colors group cursor-pointer"
                  aria-label="Next Collection"
              >
                  <ChevronRight className="w-4 h-4 text-black/40 group-hover:text-black/80" />
              </button>
          </ClientOnly>
      </div>
    </>
  );
}