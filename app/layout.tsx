import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MaxWork Consulting Client Portal",
  description: "MaxWork Consulting Client Portal for job seekers",
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
            <>{children}</> {/* Ensure a single wrapper */}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
