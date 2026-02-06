import type { Metadata } from "next";
import { cormorant, montserrat } from "@/components/ui/fonts";
import "../styles/globals.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FlowerPlus",
  description: "Your favorite flower shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorant.variable} ${montserrat.variable} antialiased`}
      >
        <Toaster
          position="top-center"
          richColors
          closeButton
          duration={3000}
        />
        {children}
      </body>
    </html>
  );
}
