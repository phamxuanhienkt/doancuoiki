import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/layout/HeaderLayout";
import Footer from "@/layout/FooterLayout";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  >

        <div className="mx-[10%]"><Header/></div>  
        <div className={inter.className}> {children}</div>
        <Footer/> 
      </body>
    </html>
  );
}
