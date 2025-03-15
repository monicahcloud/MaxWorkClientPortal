import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { SignOutButton, UserButton } from "@clerk/nextjs";

export default function LinksDropdown() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-full" variant="outline" size="icon">
            <UserButton />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/home">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/resumes">Resumes</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/applications">Applications</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/resumeBuilder">Resume Builder</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/resources">Interview Prep</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <form className="w-full text-left">
              <SignOutButton redirectUrl="/">
                <button>Logout</button>
              </SignOutButton>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
