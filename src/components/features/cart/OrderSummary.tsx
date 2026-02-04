'use client';

import React from 'react';
import { useEffect } from 'react';
import { Check, Tag } from 'lucide-react';
import ClientOnly from '@/components/common/ClientOnly';

interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    total: number;
    voucherCode?: string;
    onApplyVoucher: (code: string) => void;
}

export default function OrderSummary({
    subtotal,
    shipping,
    total,
    onApplyVoucher
}: OrderSummaryProps) {
    const [code, setCode] = React.useState('');
    const [isVoucherNotEmpty, setIsVoucherNotEmpty] = React.useState(false);
    // const [isVoucherApplied, setIsVoucherApplied] = React.useState(false);

    // Handle voucher code
    useEffect(() => {
        if (code) {
            setIsVoucherNotEmpty(true);
        } else {
            setIsVoucherNotEmpty(false);
        }
        
    }, [code]);

    return (
        <aside className="flex flex-col gap-6">
            {/* Main Summary Box */}
            <div className="border border-border p-8 bg-white">
                <h2 className="text-2xl font-cormorant text-foreground mb-6">Order Summary</h2>

                {/* Voucher Section */}
                <div className="space-y-3 mb-8">
                    <label className="text-sm text-foreground/80 font-montserrat">Voucher Code</label>
                    <div className="flex gap-1">

                        <ClientOnly>    
                            <div 
                                className="
                                    relative bg-background flex items-center justify-center flex-1
                                    border-2 border-border
                                "
                            >
                                <input
                                    type="text"
                                    placeholder="Enter code"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="
                                        w-full border-none px-4 py-3 pl-12 text-sm focus:ring-1 
                                        focus:ring-primary/20 outline-none font-montserrat
                                    "
                                />
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/80">
                                    <Tag className="w-4 h-4 " />
                                </div>
                            </div>
                        </ClientOnly>

                        <button
                            onClick={() => onApplyVoucher(code)}
                            className={`
                                bg-primary/5 px-6 py-3 text-md font-montserrat text-foreground/40 
                                transition-colors border-l border-white/20 cursor-pointer
                                ${isVoucherNotEmpty ? 
                                    'text-primary bg-background hover:text-foreground hover:bg-foreground/10' : 
                                    'disabled:opacity-50 disabled:cursor-not-allowed pointer-events-none'
                                }
                            `}
                        >
                            Apply
                        </button>
                    </div>
                    <p className="text-xs text-foreground/80 font-montserrat">
                        Try: WELCOME10, SPRING20, or SAVE15
                    </p>
                </div>

                {/* Totals Section */}
                <div className="space-y-4 py-6 border-t border-border/60">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-foreground/80">Subtotal</span>
                        <span className="font-montserrat font-medium">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-foreground/80">Shipping</span>
                        <span className="text-foreground/60 italic">
                            {shipping === 0 ? 'Calculated at checkout' : `$${shipping.toFixed(2)}`}
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center py-6 border-t border-border/60 mb-6">
                    <span className="text-lg text-foreground/80">Total</span>
                    <span className="text-2xl font-montserrat font-medium">${total.toFixed(2)}</span>
                </div>

                <ClientOnly>
                    <button className="
                        w-full bg-primary text-white py-4 rounded-sm font-montserrat text-sm
                        tracking-widest hover:bg-primary/80 transition-colors uppercase cursor-pointer
                    ">
                        Proceed to Checkout
                    </button>
                </ClientOnly>

                <p className="text-xs text-foreground text-center mt-4 font-montserrat">
                    Taxes and shipping calculated at checkout
                </p>
            </div>

            {/* Benefits Box */}
            <div className="bg-[#F4F1ED] p-8 space-y-3">
                <div className="flex items-center gap-3 text-xs text-foreground/60 font-montserrat">
                    <Check className="w-4 h-4" />
                    <span>Free delivery on orders over $100</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-foreground/60 font-montserrat">
                    <Check className="w-4 h-4" />
                    <span>Fresh flowers guarantee</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-foreground/60 font-montserrat">
                    <Check className="w-4 h-4" />
                    <span>Secure payment processing</span>
                </div>
            </div>
        </aside>
    );
}
