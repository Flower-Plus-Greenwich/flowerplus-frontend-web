"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import ClientOnly from "@/components/common/ClientOnly";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-border/50">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">Sign In</h2>

            {/* Login form */}
            <form className="space-y-6">

                {/* Email Field */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground/80">
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email here"
                        className="w-full h-12 px-4 rounded-lg bg-input border border-transparent focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200"
                    />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground/80">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password here"
                            className="w-full h-12 px-4 pr-12 rounded-lg bg-input border border-transparent focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff className="w-5 h-5" />
                            ) : (
                                <Eye className="w-5 h-5" />
                            )}
                        </button>
                    </div>
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
                        className="
                            w-full h-12 bg-primary text-primary-foreground font-medium rounded-lg 
                            hover:opacity-90 transition-opacity cursor-pointer"
                    >
                        Sign In
                    </button>
                </ClientOnly>

                {/* Register Link */}
                <div className="text-center text-md text-foreground/70">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-foreground font-medium hover:underline decoration-1 underline-offset-4">
                        Register
                    </Link>
                </div>
            </form>

            {/* Divider */}
            {/* <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-3 text-foreground/40 font-medium">Or continue with</span>
                </div>
            </div> */}

            {/* Social Media Buttons */}
            {/* <div className="grid grid-cols-2 gap-4">
                <button
                    type="button"
                    className="h-10 flex items-center justify-center gap-2 rounded-lg border border-border hover:bg-input transition-colors text-sm font-medium"
                >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                        />
                        <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                        />
                        <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                        />
                        <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                        />
                    </svg>
                    Google
                </button>
                <button
                    type="button"
                    className="h-10 flex items-center justify-center gap-2 rounded-lg border border-border hover:bg-input transition-colors text-sm font-medium"
                >
                    <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.791-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                        />
                    </svg>
                    Facebook
                </button>
            </div> */}
        </section>
    );
}