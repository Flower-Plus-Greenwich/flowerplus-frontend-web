import Link from "next/link";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function NotFound() {
    return (
        <div>
            <Header />
            <main className="flex items-center justify-center h-100">
                <div className="flex flex-col items-center justify-center gap-4">
                    <h1 className="text-4xl font-bold">404 - Not Found</h1>
                    <p className="text-lg text-muted-foreground">The page you are looking for does not exist.</p>
                    <Link 
                        href="/" 
                        className="
                            text-lg bg-primary text-white px-4 py-2 rounded-md 
                            hover:bg-primary/80 transition-colors duration-300
                        "
                    >
                        Back to Home
                    </Link>
                </div>
            </main>
            <Footer />
        </div>
    );
}   