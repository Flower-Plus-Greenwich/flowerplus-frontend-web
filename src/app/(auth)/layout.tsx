
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="
            relative min-h-screen flex flex-col items-center 
            bg-background text-foreground font-montserrat"
        >
            <header className="w-full p-4 border-1 border-b border-primary/20">
                {/* Back to Shop */}
                <Link 
                    href="/" 
                    className="
                        flex items-center gap-2 font-semibold text-sm text-primary
                        hover:text-primary/70 transition-colors group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Shop
                </Link>
            </header>

            {/* Auth Content */}
            <main className="w-full max-w-[450px] flex flex-col items-center">
                <section className="text-center my-10">
                    <h1 className="text-4xl md:text-5xl font-cormorant font-bold text-primary tracking-wider mb-2">FlowerPlus</h1>
                    <p className="text-muted-foreground text-md font-light tracking-wide">Welcome back</p>
                </section>

                {children}
            </main>
        </div>
    );
}
