'use client';

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { registerAction } from "@/actions/auth";
import ClientOnly from "@/components/common/ClientOnly";

const initialState = {
  message: '',
  errors: undefined,
  success: false
};

export default function RegisterPage() {
  const router = useRouter();
  const [state, action, isPending] = useActionState(registerAction, initialState);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (state.success) {
      // TODO: success toast message
      router.push("/login");
    }
  }, [state.success, router]);

  return (
    <section className="w-full bg-white p-6 md:p-8 rounded-lg shadow-sm border border-primary/20">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">Register</h2>

      {/* Register Form  */}
      <form className="space-y-4" action={action}>

        {/* Error Message */}
        {state.message && !state.success && (
          <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg">
            {state.message}
          </div>
        )}

        {/* Name Fields */}
        <fieldset className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium text-black/80">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Your first name"
              className={`
                w-full h-12 px-4 rounded-lg bg-input border 
                ${state.errors?.firstName ? 'border-red-500' : 'border-transparent'} 
                focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200
              `}
              autoComplete="given-name"
              defaultValue=""
            />
            {state.errors?.firstName && (
              <p className="text-xs text-red-500">{state.errors.firstName[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium ">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Your last name"
              className={`w-full h-12 px-4 rounded-lg bg-input border ${state.errors?.lastName ? 'border-red-500' : 'border-transparent'} focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200`}
              autoComplete="family-name"
              defaultValue=""
            />
            {state.errors?.lastName && (
              <p className="text-xs text-red-500">{state.errors.lastName[0]}</p>
            )}
          </div>
        </fieldset>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium ">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Your email address"
            className={`w-full h-12 px-4 rounded-lg bg-input border ${state.errors?.email ? 'border-red-500' : 'border-transparent'} focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200`}
            autoComplete="email"
            defaultValue=""
          />
          {state.errors?.email && (
            <p className="text-xs text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium ">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Type your password"
              className={`w-full h-12 px-4 pr-12 rounded-lg bg-input border ${state.errors?.password ? 'border-red-500' : 'border-transparent'} focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200`}
              defaultValue=""
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
          {state.errors?.password && (
            <p className="text-xs text-red-500">{state.errors.password[0]}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium ">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Type your password again"
            className={`w-full h-12 px-4 rounded-lg bg-input border ${state.errors?.confirmPassword ? 'border-red-500' : 'border-transparent'} focus:border-border focus:bg-white focus:outline-none focus:ring-1 focus:ring-border transition-all duration-200`}
            defaultValue=""
          />
          {state.errors?.confirmPassword && (
            <p className="text-xs text-red-500">{state.errors.confirmPassword[0]}</p>
          )}
        </div>

        {/* Register Button */}
        <ClientOnly>
          <button
            type="submit"
            disabled={isPending}
            className="w-full h-12 mt-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Register"}
          </button>
        </ClientOnly>

        {/* Sign In Link */}
        <div className="flex justify-center items-center gap-1 text-center text-md text-foreground/70">
          <p> Already have an account?</p>
          <Link
            href="/login"
            className="text-foreground font-semibold hover:underline decoration-1 underline-offset-4"
          >
            Sign In
          </Link>
        </div>

        <hr className="my-4 border border-border" />

        {/* Footer Text */}
        <footer className="w-full text-xs text-center text-muted-foreground/80 leading-relaxed">
          By creating an account, you agree to our Terms of Service and Privacy Policy.
          We&apos;ll send you occasional updates about your orders and our collections.
        </footer>

      </form>
    </section>
  );
}