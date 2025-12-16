import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Layout/Header";
import Footer from "@/src/components/Layout/Footer"; // Import Footer

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });

export const metadata = {
  title: "Atlas Cuisine",
  description: "Modern Flavors. Global Inspiration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-background`}>
        <Header />
        {children}
        <Footer /> {/* Add Footer here */}
      </body>
    </html>
  );
}