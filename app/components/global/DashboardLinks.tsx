"use client";

import { cn } from "@/lib/utils";
import { File, FilePen, HomeIcon, List, User2Icon, Users2 } from "lucide-react";
import { nanoid } from "nanoid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const dashboardlinks = [
  {
    id: nanoid(),
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    id: nanoid(),
    name: "Resumes",
    href: "/dashboard/resumes",
    icon: List,
  },
  {
    id: nanoid(),
    name: "Applications",
    href: "/dashboard/applications",
    icon: File,
  },
  {
    id: nanoid(),
    name: "Resume Builder",
    href: "/dashboard/resumeBuilder",
    icon: FilePen,
  },
  {
    id: nanoid(),
    name: "Interview Prep",
    href: "/dashboard/resources",
    icon: Users2,
  },
];

export function DashboardLinks() {
  const pathname = usePathname();
  return (
    <>
      <Button
        className="rounded-full text-black flex mx-auto mb-10 w-40 h-40"
        variant="outline"
        size="icon">
        <User2Icon />
      </Button>
      {dashboardlinks.map((link) => (
        <Link
          className={cn(
            pathname === link.href
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
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
