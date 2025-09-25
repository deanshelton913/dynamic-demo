import type { Metadata } from "next";
import "./globals.css";
import DynamicProvider from "@/components/dynamic-provider";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "Dynamic NFT Minting Demo",
  description: "Gasless NFT minting with Dynamic and ZeroDev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DynamicProvider>
          <Header />
          {children}
        </DynamicProvider>
      </body>
    </html>
  );
}
