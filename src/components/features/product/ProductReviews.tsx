'use client';

import React, { useState } from 'react';
import { Star, Pencil, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ClientOnly from '@/components/common/ClientOnly';
import { Review } from '@/types/product';

const MOCK_REVIEWS: Review[] = [
    {
        id: 1,
        userName: "Sarah Johnson",
        rating: 5,
        date: "January 10, 2024",
        content: "Absolutely stunning arrangement! The flowers were fresh and lasted over a week. The presentation was elegant and exceeded my expectations.",
        isVerified: true,
    }
];

export default function ProductReviews() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <section className="w-full py-16 max-w-screen space-y-16">
            <h2 className="text-3xl font-cormorant text-foreground font-medium">Customer Reviews</h2>

            <div className="bg-white border border-border rounded-2xl">

                {/* Write a Review Section */}
                <div className="max-w-screen p-8">
                    <h3 className="text-lg font-medium text-foreground mb-6">Write a Review</h3>

                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-foreground/60 mb-3">Your Rating</p>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                        className="transition-colors cursor-pointer"
                                    >
                                        <Star
                                            size={24}
                                            className={star <= (hover || rating) ?
                                                'text-amber-500 fill-amber-500' :
                                                'text-gray-300'
                                            }
                                        />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-sm text-foreground/60 mb-3">Your Review</p>
                            <textarea
                                placeholder="Share your experience with this product..."
                                className="w-full h-32 p-4 bg-[#fcf9f6] border border-border/50 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary/30 transition-shadow resize-none text-sm"
                            />
                        </div>
                        
                        <ClientOnly>
                            <button className="
                                px-8 py-3 bg-primary/80 text-white text-sm font-medium rounded-lg 
                                shadow-sm hover:bg-primary transition-colors cursor-pointer
                            ">
                                Submit Review
                            </button>
                        </ClientOnly>
                    </div>
                </div>

                {/* Review List */}
                <div className="space-y-8 mt-8 p-8">
                    {MOCK_REVIEWS.map((review) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="pb-8 border-b border-border/30 last:border-0"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-foreground">{review.userName}</span>
                                        {review.isVerified && (
                                            <span className="px-2 py-0.5 bg-[#fcf9f6] text-[10px] text-foreground/40 font-bold border border-border/30 rounded uppercase tracking-wider">
                                                Verified Purchase
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex text-amber-500 mt-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={12}
                                                fill={i < review.rating ? 'currentColor' : 'none'}
                                                className={i < review.rating ? '' : 'text-gray-300'}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <span className="text-xs text-foreground/40">{review.date}</span>
                            </div>

                            <p className="text-md text-foreground leading-relaxed font-light mb-6">
                                {review.content}
                            </p>

                            {/* <div className="flex gap-4">
                                <button className="p-1.5 text-foreground/40 hover:text-primary transition-colors">
                                    <Pencil size={16} />
                                </button>
                                <button className="p-1.5 text-foreground/40 hover:text-red-500 transition-colors">
                                    <Trash2 size={16} />
                                </button>
                            </div> */}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
