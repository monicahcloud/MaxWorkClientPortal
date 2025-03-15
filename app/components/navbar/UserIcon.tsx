import { UserButton } from "@clerk/nextjs";
import { User2 } from "lucide-react";
import React from "react";

export default function UserIcon() {
  return (
    <div className="text-black justify-center items-center flex mb-10">
      <User2 />
    </div>
  );
}
