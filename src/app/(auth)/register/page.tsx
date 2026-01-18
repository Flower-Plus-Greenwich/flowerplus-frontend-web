"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import ClientOnly from "@/components/common/ClientOnly";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-primary/20">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">Register</h2>

      <form className="space-y-4">
        {/* Name Fields */}
        <fieldset className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-primary">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Your first name"
              className="w-full h-12 px-4 rounded-lg bg-input border border-transparent focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200"
              autoComplete="on"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium text-primary">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Your last name"
              className="w-full h-12 px-4 rounded-lg bg-input border border-transparent focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200"
              autoComplete="on"
            />
          </div>
        </fieldset>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-primary">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your email address"
            className="w-full h-12 px-4 rounded-lg bg-input border border-transparent focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200"
              autoComplete="on"
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-primary">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Type your password"
              className="w-full h-12 px-4 pr-12 rounded-lg bg-input border border-transparent focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-primary">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Type your password again"
            className="w-full h-12 px-4 rounded-lg bg-input border border-transparent focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200"
          />
        </div>

        {/* Create Account Button */}
        <ClientOnly>
          <button
            type="submit"
            className="w-full h-12 mt-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            Create Account
          </button>
        </ClientOnly>

        {/* Sign In Link */}
        <div className="flex justify-center items-center gap-1 text-center text-md text-foreground/70">
          <p> Already have an account?</p> 
          <Link 
            href="/login" 
            className="text-foreground font-medium hover:underline decoration-1 underline-offset-4"
          >
            Sign In
          </Link>
        </div>

        <hr className="my-4 border border-border"/>

        {/* Footer Text */}
        <footer className="w-full text-xs text-center text-muted-foreground/80 leading-relaxed">
          By creating an account, you agree to our Terms of Service and Privacy Policy. We&apos;ll send you occasional updates about your orders and our collections.
        </footer>
      </form>
    </section>
  );
}