import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MaxWork Staffing Client Portal",
  description: "MaxWork Staffing Client Portal for job seekers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            {" "}
            {children} {/* Ensure a single wrapper */}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
