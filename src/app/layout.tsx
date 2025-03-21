import type { Metadata } from "next";
import { Inter, Righteous } from "next/font/google";
import "./globals.css";
import { ThemeProviderWrapper } from "@/components/theme-provider-wrapper";

const inter = Inter({ subsets: ["latin"] });
const righteous = Righteous({ 
  weight: '400', 
  subsets: ['latin'],
  variable: '--font-righteous-fallback'
});

export const metadata: Metadata = {
  title: "Froggy Portfolio",
  description: "An interactive portfolio website with frogs theme",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.className} ${righteous.variable} font-righteous-loaded`}>
        <ThemeProviderWrapper>
          {children}
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
