'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Suspense } from "react";
import ClientOnly from "@/components/common/ClientOnly";

export default function ForgotPasswordSuccessPage() {
    const searchParams = useSearchParams();
    const email = searchParams.get('email') || 'your email';

    return (
        <Suspense fallback={
            <section className="w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-primary/20">
                <div className="animate-pulse space-y-4">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
                    <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto"></div>
                </div>
            </section>
        }>
            <section className="w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-primary/20">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">Reset Password</h2>

                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                </div>

                {/* Success Message */}
                <div className="text-center space-y-4 mb-8">
                    <h3 className="text-xl font-semibold text-foreground">Check your email</h3>
                    <p className="text-muted-foreground">
                        We&apos;ve sent password reset instructions to{" "}
                        <span className="text-primary font-medium">{email}</span>
                    </p>
                </div>

                {/* Back to Sign In Link */}
                <div className="text-center">
                    <ClientOnly>
                        <Link
                            href="/login"
                            className="
                                inline-block w-full h-12 bg-primary text-primary-foreground font-medium rounded-lg 
                                hover:opacity-90 transition-opacity flex items-center justify-center p-3"
                        >
                            Back to Sign In
                        </Link>
                    </ClientOnly>
                </div>

                {/* Resend Link */}
                <div className="text-center mt-4 text-sm">
                    <span className="text-muted-foreground">Didn&apos;t receive the email? </span>
                    <Link
                        href="/forgot-password"
                        className="text-primary hover:underline underline-offset-4"
                    >
                        Resend
                    </Link>
                </div>
            </section>
        </Suspense>
    );
}
