import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <Header />
            <main className="grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}