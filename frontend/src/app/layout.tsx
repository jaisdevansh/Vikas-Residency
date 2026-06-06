import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import { ThemeProvider } from "@/components/ThemeProvider";
import BackgroundEffects from "@/components/BackgroundEffects";
import { AdaptivePerformanceProvider } from "@/context/AdaptivePerformanceContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vikas Residency | Best Homestay in Varanasi",
    template: "%s | Vikas Residency",
  },
  description: "Experience the spiritual essence of Varanasi at Vikas Residency. A premium budget homestay near Kashi Vishwanath and Ghats.",
  keywords: ["homestay in varanasi", "budget homestay varanasi", "family homestay kashi", "homestay near assi ghat", "vikas residency"],
  openGraph: {
    title: "Vikas Residency | Best Homestay in Varanasi",
    description: "Premium comfort near the holy ghats of Varanasi.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} scroll-smooth antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Preload hero image so browser starts fetching before React renders */}
        <link rel="preload" as="image" href="/1.jpeg" fetchPriority="high" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen flex flex-col font-sans transition-colors duration-300" suppressHydrationWarning>
        <AdaptivePerformanceProvider>
          <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
            <BackgroundEffects />
            <Navbar />
            <div className="flex-1 relative z-10">
              {children}
            </div>
            <Footer />
            <StickyCTA />
          </ThemeProvider>
        </AdaptivePerformanceProvider>
      </body>
    </html>
  );
}
