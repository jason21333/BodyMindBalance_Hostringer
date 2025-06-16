import { Inter, Source_Code_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Navbar from "./components/Navbar";
import "./globals.css";
import Footer, { WhatsAppButton } from './components/Footer';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const sourceCode = Source_Code_Pro({
  variable: "--font-source-code",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Body Mind Balance - Wellness & Medical Center",
  description: "Expert care for diabetes, hypertension, and weight management. Holistic wellness solutions for a healthier you.",
  keywords: "diabetes care, hypertension management, weight loss, wellness center, medical center",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${sourceCode.variable}`}>
      <head>
        <link rel="icon" href="/bmb-logo.png" />
      </head>
      <body className="antialiased">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          {children}
          <Footer />
          <WhatsAppButton />
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
