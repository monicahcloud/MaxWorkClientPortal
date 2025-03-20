"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import logo from "@/public/MaxWorkLogo.png";
import {
  CardDescription,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to /home
  useEffect(() => {
    if (isSignedIn) {
      router.push("/home");
    }
  }, [isSignedIn, router]);

  return (
    <main>
      <header className="max-w-xl mx-auto px-8 py-6">
        <Image src={logo} alt="logo" priority />
      </header>

      <section className="max-w-6xl mx-auto px-8 h-screen -mt-30 items-center">
        <div className="flex h-screen w-full items-center justify-center px-4">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle className="text-2xl whitespace-nowrap">
                Welcome To Your Client Portal
              </CardTitle>
              <CardDescription>
                {/* Enter your email below to login into your accounts */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-y-4 text-2xl text-gray-600 items-center">
                Authenticate Your Account
                <div className="flex flex-col gap-y-2">
                  <Button asChild className="mt-4">
                    <Link href="/sign-in">Get Started</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
