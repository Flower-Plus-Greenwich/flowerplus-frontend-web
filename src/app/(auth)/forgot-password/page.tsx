'use client';

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { forgotPasswordAction } from "@/actions/auth";
import ClientOnly from "@/components/common/ClientOnly";

const initialState = {
    message: '',
    errors: undefined,
    success: false
};

export default function ForgotPasswordPage() {
    const router = useRouter();

    // Form state
    const [email, setEmail] = useState('');
    // console.log("Email: " + email)

    // Server action state
    const [state, action, isPending] = useActionState(forgotPasswordAction, initialState);

    useEffect(() => {   
        console.log("Email: " + email)

        // Redirect to success page or error page based on the state
        if (state.success && state.data) {
            // Success
            const email = state.data.email || '';
            router.push(`/forgot-password/success?email=${
                encodeURIComponent(email)
            }`);

        } else if (state.message && !state.errors && !state.success && !isPending) {
            // Error
            router.push(`/forgot-password/error?message=${
                encodeURIComponent(state.message as string)
            }`);
        }
    }, [state.success, state.data, state.message, isPending, router]);

    return (
        <section className="w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-primary/20">
            <h2 className="text-3xl font-bold text-center text-primary mb-4">Reset Password</h2>

            <p className="text-center text-muted-foreground mb-8">
                Enter your email address and we&apos;ll send you instructions to reset your password.
            </p>

            {/* Forgot Password form */}
            <form className="space-y-6" action={action}>

                {state.message && state.success && (
                    <div className="p-4 text-sm text-green-700 bg-green-50 border border-green-500 rounded-lg">
                        {state.message}
                    </div>
                )}

                {state.message && !state.success && (
                    <div className="p-4 text-sm text-red-500 bg-red-50 border border-red-500 rounded-lg">
                        {state.message}
                    </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">
                        Email Address
                    </label>
                    <input
                        id="email"
                        name="email"
                        placeholder="example@gmail.com"
                        className={`
                            w-full h-12 px-4 rounded-lg bg-input border 
                            ${state.errors?.email ? 'border-red-500 bg-red-50' : 'border-transparent'}
                            focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200
                        `}
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {state.errors?.email && (
                        <p className="text-xs text-red-500">{state.errors.email[0]}</p>
                    )}
                </div>

                {/* Submit Button */}
                <ClientOnly>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="
                            w-full h-12 bg-primary text-primary-foreground font-medium rounded-lg 
                            hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center 
                            disabled:opacity-70 disabled:cursor-not-allowed
                        "
                    >
                        {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Instructions"}
                    </button>
                </ClientOnly>

                {/* Back to Sign In Link */}
                <div className="text-center text-sm">
                    <Link
                        href="/login"
                        className="text-foreground/60 hover:text-primary transition-colors underline underline-offset-4"
                    >
                        Back to Sign In
                    </Link>
                </div>

            </form>
        </section>
    );
}