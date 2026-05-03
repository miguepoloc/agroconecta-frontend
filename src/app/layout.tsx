import type { Metadata } from "next";
import { Epilogue, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "@/components/ui/sonner";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-epilogue",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AgroConecta — Del campo a tu mesa",
  description:
    "Marketplace agrícola que conecta agricultores colombianos con compradores individuales e institucionales. El 82% de cada compra va directo al agricultor.",
  keywords: ["agricultura", "colombia", "productos frescos", "agricultores", "marketplace"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${epilogue.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-surface text-on-surface">
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster richColors position="top-right" />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
