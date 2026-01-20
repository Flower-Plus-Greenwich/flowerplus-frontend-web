'use client';

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { loginAction } from "@/actions/auth";
import ClientOnly from "@/components/common/ClientOnly";
import { toast } from "sonner";

const initialState = {
    message: '',
    errors: undefined,
    success: false
};

export default function LoginPage() {
    const router = useRouter();

    // Form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Server action state
    const [state, action, isPending] = useActionState(loginAction, initialState);

    useEffect(() => {
        if (state.success && state.data?.accessToken) {
            toast.success(state.message || "Login successful!");
            router.push("/login/success");
        }
    }, [state.success, state.data, state.message, router]);

    return (
        <ClientOnly>
            <section
                className="
                    w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-primary/20
                "
            >
                <h2 className="text-3xl font-bold text-center text-primary mb-8">Sign In</h2>

                {/* Login form */}
                <form className="space-y-6" action={action}>

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
                            placeholder="Enter your email here"
                            className={`
                                w-full h-12 px-4 rounded-lg bg-input border 
                                ${state.errors?.email ? 'border-red-500 bg-red-50' : 'border-transparent'}
                                focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200
                            `}
                            autoComplete="on"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {state.errors?.email && (
                            <p className="text-xs text-red-500">{state.errors.email[0]}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password here"
                                className={`
                                    w-full h-12 px-4 pr-12 rounded-lg bg-input border 
                                    ${state.errors?.password ? 'border-red-500 bg-red-50' : 'border-transparent'}
                                    focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200
                                `}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <ClientOnly>
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="
                                        absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground 
                                        hover:text-foreground transition-colors cursor-pointer"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </ClientOnly>
                        </div>
                        {state.errors?.password && (
                            <p className="text-xs text-red-500">{state.errors.password[0]}</p>
                        )}
                        <div className="flex justify-end pt-1">
                            <Link
                                href="/forgot-password"
                                className="text-sm text-foreground/60 hover:text-primary transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
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
                            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
                        </button>
                    </ClientOnly>

                    {/* Register Link */}
                    <div className="text-center text-md text-foreground/70">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="text-foreground font-semibold hover:underline decoration-1 underline-offset-4"
                        >
                            Register
                        </Link>
                    </div>

                </form>
            </section>
        </ClientOnly>
    );
}