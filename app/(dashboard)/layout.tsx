import Link from "next/link";
import { PropsWithChildren } from "react";
import Logo from "@/public/MaxWorkLogo.png";
import Image from "next/image";
import { DashboardLinks } from "../components/global/DashboardLinks";
import { Menu } from "lucide-react";
import { SheetContent, SheetTrigger, Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import LinksDropdown from "../components/global/LinksDropdown";
import DarkMode from "../components/navbar/DarkMode";

export default function Dashboardlayout({ children }: PropsWithChildren) {
  return (
    <>
      <main
        id="main-layout"
        className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex flex-col max-h-screen h-full gap-2">
            <div className="h-14 flex items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link href="/home" className="flex items-center gap-2">
                <Image src={Logo} alt="Logo" priority />
              </Link>
            </div>
            <div className="flex-1">
              <nav className="grid items-start text-white lg:px-4 px-2 text-sm font-medium mt-20">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex h-14 items-center gap-4 px-4 border-b bg-muted/40 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger>
                <Button
                  asChild
                  variant="outline"
                  size="icon"
                  className="md:hidden">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid-2 gap-2 mt-10">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex items-center ml-auto">
              <DarkMode />
              <LinksDropdown />
            </div>
          </div>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-8 lg:p-8">
            {children}
          </main>
        </div>
      </main>
      <Toaster richColors closeButton theme="light" />
    </>
  );
}
