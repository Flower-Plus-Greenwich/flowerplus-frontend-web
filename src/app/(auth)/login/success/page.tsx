'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function LoginSuccessPage() {
    const router = useRouter();

    useEffect(() => {
        // Redirect to homepage after 2 seconds
        const timer = setTimeout(() => {
            router.push('/');
        }, 2000);

        // Cleanup timer on unmount
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <section className="w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-primary/20">
            <div className="flex flex-col items-center justify-center space-y-6 py-8">
                {/* Success Icon */}
                <div className="relative">
                    <CheckCircle className="w-20 h-20 text-primary" />
                </div>

                {/* Success Message */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-primary">Login Successful!</h2>
                    <p className="text-foreground/70">
                        Redirecting you to homepage...
                    </p>
                </div>

                {/* Loading Indicator */}
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce " />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
            </div>
        </section>
    );
}
