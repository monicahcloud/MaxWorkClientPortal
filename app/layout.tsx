import type { Metadata } from "next";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  UserButton,
} from "@clerk/nextjs";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MaxWork Consulting Client Portal",
  description: "MaxWork Consulting Client Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ClerkProvider>
        <html lang="en" suppressHydrationWarning>
          <body className={inter.className}>
            {/* <header className="flex justify-between ">
              <h1 className="text-3xl">MaxWork Consulting</h1>
              <UserButton showName />
            </header> */}
            <main>
              {/* <SignedOut>
                <SignIn routing="hash"></SignIn>
              </SignedOut>
              <SignedIn>{children}</SignedIn> */}
              {children}
            </main>
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
