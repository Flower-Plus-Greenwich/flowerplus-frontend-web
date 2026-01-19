'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { XCircle } from "lucide-react";
import { Suspense } from "react";

function ErrorContent() {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || 'Failed to send password reset instructions';

    return (
        <section className="w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-primary/20">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">Reset Password</h2>

            {/* Error Icon */}
            <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-red-600" />
                </div>
            </div>

            {/* Error Message */}
            <div className="text-center space-y-4 mb-8">
                <h3 className="text-xl font-semibold text-foreground">Something went wrong</h3>
                <p className="text-muted-foreground">
                    {message}
                </p>
            </div>

            {/* Try Again Button */}
            <div className="space-y-3">
                <Link
                    href="/forgot-password"
                    className="inline-block w-full h-12 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                >
                    Try Again
                </Link>

                {/* Back to Sign In Link */}
                <div className="text-center">
                    <Link
                        href="/login"
                        className="text-sm text-foreground/60 hover:text-primary transition-colors underline underline-offset-4"
                    >
                        Back to Sign In
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default function ForgotPasswordErrorPage() {
    return (
        <Suspense fallback={
            <section className="w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-primary/20">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto"></div>
                </div>
            </section>
        }>
            <ErrorContent />
        </Suspense>
    );
}
