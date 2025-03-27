"use client";

import { cn } from "@/lib/utils";
import {
  Blocks,
  File,
  FilePen,
  FileStack,
  HomeIcon,
  List,
  Users2,
} from "lucide-react";
import { nanoid } from "nanoid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";

export const dashboardlinks = [
  {
    id: nanoid(),
    name: "Dashboard",
    href: "/home",
    icon: HomeIcon,
  },
  {
    id: nanoid(),
    name: "Resumes",
    href: "/resumes",
    icon: List,
  },
  // {
  //   id: nanoid(),
  //   name: "Applications",
  //   href: "/applications",
  //   icon: File,
  // },
  {
    id: nanoid(),
    name: "Resume Builder",
    href: "/resumeBuilder",
    icon: FilePen,
  },
  {
    id: nanoid(),
    name: "Add A Job",
    href: "/add-job",
    icon: Blocks,
  },
  {
    id: nanoid(),
    name: "Jobs",
    href: "/jobs",
    icon: Blocks,
  },
  {
    id: nanoid(),
    name: "Interview Prep",
    href: "/resources",
    icon: Users2,
  },
];

export function DashboardLinks() {
  const pathname = usePathname();
  const { user } = useUser(); // Get user data from Clerk

  return (
    <>
      <h1 className="text-xl text-primary mx-auto mb-4">
        Welcome, {user?.firstName || "User"}
      </h1>
      <Button
        className="rounded-full flex mx-auto mb-10 w-40 h-40 overflow-hidden p-0 border"
        variant="outline"
        size="lg">
        {user?.imageUrl ? (
          <Image
            priority
            src={user.imageUrl}
            alt="User Profile Picture"
            width={160}
            height={160}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500">No Image</span>
        )}
      </Button>

      {dashboardlinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 text-xl transition-all hover:text-primary"
          )}
          href={link.href}
          key={link.id}>
          <link.icon className="size-4" />
          {link.name}
        </Link>
      ))}
    </>
  );
}
