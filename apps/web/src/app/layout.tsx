"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/layout/HeaderLayout";
import Footer from "@/layout/FooterLayout";
import { usePathname } from "next/navigation";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import { WagmiProvider } from "wagmi";
import { config } from "@/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  hideHeader = false,
  hideFooter = false,
}: Readonly<{
  children: React.ReactNode;
  hideHeader?: boolean;
  hideFooter?: boolean;
}>) {
  const pathname = usePathname();
  const isHide =
    pathname.includes("/onboarding") || pathname.includes("/register");
  return (
    <html lang="en">
      <body>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <>
              {!isHide && (
                <div className="px-[10%]">
                  <Header />
                </div>
              )}
              <div className={'relative'}> {children}</div>
              {!hideFooter && <Footer />}
            </>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
