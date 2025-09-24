import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Mental Wellness Companion | Your Digital Sanctuary",
  description: "A futuristic, emotionally engaging mental health app for students. Track your growth, find calm, and build resilience with our living avatar companion.",
  keywords: ["mental health", "wellness", "students", "stress relief", "mindfulness", "digital companion"],
  authors: [{ name: "Mental Wellness Team" }],
  openGraph: {
    title: "Mental Wellness Companion | Your Digital Sanctuary",
    description: "A futuristic, emotionally engaging mental health app for students.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-black text-white`}
      >
        {children}
      </body>
    </html>
  );
}
